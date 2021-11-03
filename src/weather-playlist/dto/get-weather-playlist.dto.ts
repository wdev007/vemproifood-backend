import { IsString, IsLongitude, IsLatitude } from 'class-validator';

export class GetWeatherPlaylistDto {
  @IsString()
  city: string;

  @IsLatitude()
  lat: string;

  @IsLongitude()
  long: string;
}
