import { PartialType } from '@nestjs/mapped-types';
import { CreateWeatherPlaylistDto } from './create-weather-playlist.dto';

export class UpdateWeatherPlaylistDto extends PartialType(CreateWeatherPlaylistDto) {}
