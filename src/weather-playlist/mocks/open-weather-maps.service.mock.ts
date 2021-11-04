import { Observable } from 'rxjs';

export class OpenWeatherMapsServiceMock {
  fetchTemperature() {
    return new Observable((subscribe) => {
      subscribe.next(279);
      subscribe.complete();
    });
  }
}
