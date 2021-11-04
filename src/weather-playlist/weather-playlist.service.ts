import { Injectable } from '@nestjs/common';
import { mergeMap } from 'rxjs';

import { OpenWeatherMapsService } from './services/open-weather-maps/open-weather-maps.service';
import { SpotifyService } from './services/spotify/spotify.service';

import { IParametersWeatherPlaylist } from './interfaces/parameters';
import { ConfigService } from '@nestjs/config';
import { IGenresByTemperature } from './interfaces/genres-by-temperature';
import { Genres } from './enums/genres';

@Injectable()
export class WeatherPlaylistService {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly openWeatherMapsService: OpenWeatherMapsService,
    private readonly configService: ConfigService,
  ) {}

  findAll(parameters: IParametersWeatherPlaylist) {
    return this.openWeatherMapsService.fetchTemperature(parameters).pipe(
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
    );
  }

  getGenresByTemperature(tempetature: number): string {
    const genresByTemperature = this.configService.get<IGenresByTemperature[]>(
      'genres_by_temperature',
    );

    const genre = genresByTemperature.find(
      (item) =>
        (tempetature > item.temp_min && !item.temp_max) ||
        (tempetature < item.temp_max && !item.temp_min) ||
        (tempetature >= item.temp_min && tempetature < item.temp_max),
    );

    return genre?.name || Genres.PARTY;
  }
}
