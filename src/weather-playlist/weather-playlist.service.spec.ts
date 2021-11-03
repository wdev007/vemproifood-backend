import { Test, TestingModule } from '@nestjs/testing';
import { WeatherPlaylistService } from './weather-playlist.service';

describe('WeatherPlaylistService', () => {
  let service: WeatherPlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherPlaylistService],
    }).compile();

    service = module.get<WeatherPlaylistService>(WeatherPlaylistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
