import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherPlaylistModule } from './weather-playlist/weather-playlist.module';

@Module({
  imports: [WeatherPlaylistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
