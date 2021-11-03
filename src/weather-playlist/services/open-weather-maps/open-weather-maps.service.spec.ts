import { Test, TestingModule } from '@nestjs/testing';
import { OpenWeatherMapsService } from './open-weather-maps.service';

describe('OpenWeatherMapsService', () => {
  let service: OpenWeatherMapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenWeatherMapsService],
    }).compile();

    service = module.get<OpenWeatherMapsService>(OpenWeatherMapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
