import { Genres } from '../enums/genres';

export interface IGenresByTemperature {
  name: Genres.PARTY | Genres.POP | Genres.ROCK | Genres.CLASSICAL;
  temp_min?: number;
  temp_max?: number;
}
