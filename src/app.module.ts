import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherPlaylistModule } from './weather-playlist/weather-playlist.module';

import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    WeatherPlaylistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
