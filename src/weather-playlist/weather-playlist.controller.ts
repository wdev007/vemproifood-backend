import { Controller, Get, Query } from '@nestjs/common';
import { GetWeatherPlaylistDto } from './dto/get-weather-playlist.dto';
import { WeatherPlaylistService } from './weather-playlist.service';

@Controller('weather-playlist')
export class WeatherPlaylistController {
  constructor(
    private readonly weatherPlaylistService: WeatherPlaylistService,
  ) {}

  @Get()
  findAll(@Query() parameters: GetWeatherPlaylistDto) {
    console.log('WeatherPlaylistController: ', parameters);
    return this.weatherPlaylistService.findAll(parameters);
  }
}
