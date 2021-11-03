import { Test, TestingModule } from '@nestjs/testing';
import { WeatherPlaylistController } from './weather-playlist.controller';
import { WeatherPlaylistService } from './weather-playlist.service';

describe('WeatherPlaylistController', () => {
  let controller: WeatherPlaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherPlaylistController],
      providers: [WeatherPlaylistService],
    }).compile();

    controller = module.get<WeatherPlaylistController>(
      WeatherPlaylistController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
