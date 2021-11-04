import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, throwError } from 'rxjs';
import { SpotifyService } from './spotify.service';

class HttpServiceMock {
  get() {
    return new Observable((subscribe) => {
      subscribe.next({
        data: {
          tracks: [{ name: 'Faixa 1' }, { name: 'Faixa 2' }],
        },
      });
    });
  }

  post() {
    return new Observable((subscribe) => {
      subscribe.next({
        data: {
          access_token: 'faketokenspotify',
        },
      });
      subscribe.complete();
    });
  }
}

describe('SpotifyService', () => {
  let service: SpotifyService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpotifyService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('fakeurl'),
          },
        },
        {
          provide: HttpService,
          useClass: HttpServiceMock,
        },
      ],
    }).compile();

    service = module.get<SpotifyService>(SpotifyService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('authenticate', () => {
    it('should be able return a access token', () => {
      service.authenticate().subscribe((response) => {
        expect(response).toEqual('faketokenspotify');
      });
    });

    it('should be able return error', () => {
      jest
        .spyOn(httpService, 'post')
        .mockImplementation(() => throwError(() => new Error('Not Found')));
      service.authenticate().subscribe((response) => {
        expect(response).toEqual('Not Found');
      });
    });
  });

  describe('findTracksRecommendations', () => {
    it('should be able return a list of tracks', () => {
      service
        .findTracksRecommendations(
          {
            limit: 2,
            market: 'BR',
            seed_genres: 'pop',
          },
          'faketoken',
        )
        .subscribe((response) => {
          expect(response.length).toEqual(2);
        });
    });

    it('should be able return error', () => {
      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => throwError(() => new Error('Not Found')));
      service
        .findTracksRecommendations(
          {
            limit: 1,
            market: 'BR',
            seed_genres: 'pop',
          },
          '',
        )
        .subscribe((response) => {
          expect(response).toEqual('Not Found');
        });
    });
  });
});
