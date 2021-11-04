import { Test, TestingModule } from '@nestjs/testing';
import { WeatherPlaylistServiceMock } from './mocks/weather-playlist.service.mock';
import { WeatherPlaylistController } from './weather-playlist.controller';
import { WeatherPlaylistService } from './weather-playlist.service';

describe('WeatherPlaylistController', () => {
  let controller: WeatherPlaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherPlaylistController],
      providers: [
        {
          provide: WeatherPlaylistService,
          useClass: WeatherPlaylistServiceMock,
        },
      ],
    }).compile();

    controller = module.get<WeatherPlaylistController>(
      WeatherPlaylistController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should be able return a list of tracks', () => {
      controller
        .findAll({ city: 'maceio', lat: '', long: '' })
        .subscribe((response) => {
          expect(response.length).toEqual(4);
        });
    });
  });
});
