import { Observable } from 'rxjs';

export class WeatherPlaylistServiceMock {
  findAll() {
    return new Observable((subscribe) => {
      subscribe.next(['Faixa 1', 'Faixa 2', 'Faixa 3', 'Faixa 4']);
      subscribe.complete();
    });
  }
}
