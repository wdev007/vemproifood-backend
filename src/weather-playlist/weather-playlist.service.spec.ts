import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { OpenWeatherMapsServiceMock } from './mocks/open-weather-maps.service.mock';
import { SpotifyServiceMock } from './mocks/spotify.service.mock';
import { OpenWeatherMapsService } from './services/open-weather-maps/open-weather-maps.service';
import { SpotifyService } from './services/spotify/spotify.service';
import { WeatherPlaylistService } from './weather-playlist.service';

describe('WeatherPlaylistService', () => {
  let service: WeatherPlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherPlaylistService,
        {
          provide: SpotifyService,
          useClass: SpotifyServiceMock,
        },
        {
          provide: OpenWeatherMapsService,
          useClass: OpenWeatherMapsServiceMock,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest
              .fn()
              .mockReturnValue([{ name: '', temp_min: 10, temp_max: 15 }]),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherPlaylistService>(WeatherPlaylistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be able return a list of tracks', () => {
      service.findAll({ city: '', lat: '', long: '' }).subscribe((response) => {
        expect(response.length).toEqual(2);
      });
    });
  });
});
