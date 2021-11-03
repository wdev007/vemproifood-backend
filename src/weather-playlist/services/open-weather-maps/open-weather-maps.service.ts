import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

import {
  IParametersRequestFetchTemprerature,
  IResponseFetchTemprerature,
} from './interfaces';

@Injectable()
export class OpenWeatherMapsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService,
  ) {}

  fetchTemperature(paramters: IParametersRequestFetchTemprerature) {
    const baseUrl = this.configService.get('OPEN_WEATHER_MAPS_BASE_URL');
    console.log('baseUrl: ', baseUrl);

    const url = this.mountUrl(baseUrl, paramters);

    return this.http
      .get<IResponseFetchTemprerature>(url)
      .pipe(
        map((response) => this.converKelvinToCelsius(response.data.main.temp)),
      );
  }

  mountUrl(
    baseUrl: string,
    parameters: IParametersRequestFetchTemprerature,
  ): string {
    const apiKey = this.configService.get('OPEN_WEATHER_MAPS_API_KEY');
    let url = baseUrl + '?';

    if (parameters.city) {
      url += `q=${parameters.city}`;
    } else if (parameters.lat && parameters.long) {
      url += `lat=${parameters.lat}&lon=${parameters.long}`;
    }

    url += `&appid=${apiKey}`;

    return url;
  }

  convertFahrenheitToCelsius(fahrenheit: number): number {
    return ((fahrenheit - 32) * 5) / 9;
  }

  converKelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
  }
}
