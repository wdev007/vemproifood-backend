import { Injectable } from '@nestjs/common';
import { finalize, mergeMap } from 'rxjs';
import { IParametersWeatherPlaylist } from './interfaces/parameters';
import { OpenWeatherMapsService } from './services/open-weather-maps/open-weather-maps.service';
import { SpotifyService } from './services/spotify/spotify.service';

@Injectable()
export class WeatherPlaylistService {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly openWeatherMapsService: OpenWeatherMapsService,
  ) {}

  findAll(parameters: IParametersWeatherPlaylist) {
    return new Promise((resolve) => {
      this.openWeatherMapsService.fetchTemperature(parameters).pipe(
        mergeMap((temperature) =>
          this.spotifyService.authenticate().pipe(
            mergeMap((responseAuth) =>
              this.spotifyService
                .findTracksRecommendations(
                  {
                    limit: 20,
                    market: 'BR',
                    seed_genres: this.getStyleByTemperature(temperature),
                  },
                  responseAuth,
                )
                .pipe(
                  finalize(() => {
                    resolve(true);
                  }),
                ),
            ),
          ),
        ),
      );
    });
  }

  getStyleByTemperature(tempetature: number): string {
    if (tempetature > 30) {
      return 'party';
    } else if (tempetature >= 15 && tempetature < 30) {
      return 'pop';
    } else if (tempetature >= 10 && tempetature <= 14) {
      return 'rock';
    }
    return 'classical';
  }
}
