import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';
import qs from 'qs';

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

    const body = qs.stringify({
      grant_type: 'client_credentials',
    });

    return this.http
      .post<IResponseAuthenticate>(url, body, {
        headers,
      })
      .pipe(map((response) => response.data.access_token));
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

    return this.http
      .get<IResponseTracksRecommendations>(url, { headers })
      .pipe(map((response) => response.data.tracks.map((track) => track.name)));
  }

  mountUrl(baseUrl: string, parameters: IFilterTracksRecommendations): string {
    let url = baseUrl + '?';
    for (const param in parameters) {
      url += `${param}=${parameters[param]}`;
    }
    return url;
  }
}
