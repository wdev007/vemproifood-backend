import { Module } from '@nestjs/common';
import { WeatherPlaylistService } from './weather-playlist.service';
import { WeatherPlaylistController } from './weather-playlist.controller';
import { SpotifyService } from './services/spotify/spotify.service';
import { OpenWeatherMapsService } from './services/open-weather-maps/open-weather-maps.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [WeatherPlaylistController],
  imports: [ConfigModule, HttpModule],
  providers: [WeatherPlaylistService, SpotifyService, OpenWeatherMapsService],
})
export class WeatherPlaylistModule {}
