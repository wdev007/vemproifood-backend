import { Injectable } from '@nestjs/common';
import { mergeMap } from 'rxjs';

import { OpenWeatherMapsService } from './services/open-weather-maps/open-weather-maps.service';
import { SpotifyService } from './services/spotify/spotify.service';

import { Genres } from './enums/genres';

import { IParametersWeatherPlaylist } from './interfaces/parameters';

@Injectable()
export class WeatherPlaylistService {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly openWeatherMapsService: OpenWeatherMapsService,
  ) {}

  findAll(parameters: IParametersWeatherPlaylist) {
    return new Promise((resolve) => {
      this.openWeatherMapsService
        .fetchTemperature(parameters)
        .pipe(
          mergeMap((temperature) =>
            this.spotifyService.authenticate().pipe(
              mergeMap((responseAuth) =>
                this.spotifyService.findTracksRecommendations(
                  {
                    limit: 20,
                    market: 'BR',
                    seed_genres: this.getGenresByTemperature(temperature),
                  },
                  responseAuth,
                ),
              ),
            ),
          ),
        )
        .subscribe((response) => {
          resolve(response);
        });
    });
  }

  getGenresByTemperature(tempetature: number): string {
    if (tempetature > 30) {
      return Genres.PARTY;
    } else if (tempetature >= 15 && tempetature < 30) {
      return Genres.POP;
    } else if (tempetature >= 10 && tempetature <= 14) {
      return Genres.ROCK;
    }
    return Genres.CLASSICAL;
  }
}
