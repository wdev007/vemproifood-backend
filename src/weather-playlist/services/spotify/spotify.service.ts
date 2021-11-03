import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map, of } from 'rxjs';
import { URLSearchParams } from 'url';

import {
  IResponseAuthenticate,
  IFilterTracksRecommendations,
  IResponseTracksRecommendations,
} from './interfaces';

@Injectable()
export class SpotifyService {
  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService,
  ) {}

  authenticate() {
    const url = this.configService.get('SPOTIFY_URL_AUTHENTICATE');
    const clientId = this.configService.get('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get('SPOTIFY_CLIENT_SECRET');

    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`,
      ).toString('base64')}`,
    };

    const params = new URLSearchParams();

    params.append('grant_type', 'client_credentials');

    console.log(params);
    return this.http
      .post<IResponseAuthenticate>(url, params, {
        headers,
      })
      .pipe(
        map((response) => response.data.access_token),
        catchError((error) => {
          console.log('error', error);
          return of();
        }),
      );
  }

  findTracksRecommendations(
    parameters: IFilterTracksRecommendations,
    accessToken: string,
  ) {
    const baseUrl = this.configService.get('SPOTIFY_BASE_URL');

    const url = this.mountUrl(`${baseUrl}/recommendations`, parameters);

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return this.http.get<IResponseTracksRecommendations>(url, { headers }).pipe(
      map((response) => response.data.tracks.map((track) => track.name)),
      catchError((error) => {
        console.log('error: ', error);
        return of();
      }),
    );
  }

  mountUrl(baseUrl: string, parameters: IFilterTracksRecommendations): string {
    let url = baseUrl + '?';
    for (const param in parameters) {
      url += `${param}=${parameters[param]}&`;
    }

    return url[url.length - 1] === '&' ? url.slice(0, -1) : url;
  }
}
