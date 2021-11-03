import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherPlaylistModule } from './weather-playlist/weather-playlist.module';

@Module({
  imports: [ConfigModule.forRoot(), WeatherPlaylistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
