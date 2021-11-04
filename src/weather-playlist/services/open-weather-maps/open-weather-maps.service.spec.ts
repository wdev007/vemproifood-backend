import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { OpenWeatherMapsService } from './open-weather-maps.service';

class HttpServiceMock {
  get() {
    return new Observable((subscribe) => {
      subscribe.next({
        data: {
          main: {
            temp: 282,
          },
        },
      });
    });
  }
}

describe('OpenWeatherMapsService', () => {
  let service: OpenWeatherMapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenWeatherMapsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('urlfake'),
          },
        },
        {
          provide: HttpService,
          useClass: HttpServiceMock,
        },
      ],
    }).compile();

    service = module.get<OpenWeatherMapsService>(OpenWeatherMapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchTemperature', () => {
    it('should be able return a temeperature', () => {
      service
        .fetchTemperature({ city: 'maceio', lat: '', long: '' })
        .subscribe((response) => {
          expect(response).toEqual(8.850000000000023);
        });
    });
  });
});
