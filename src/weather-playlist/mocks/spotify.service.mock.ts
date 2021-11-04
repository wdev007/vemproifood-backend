import { Observable } from 'rxjs';

export class SpotifyServiceMock {
  authenticate() {
    return new Observable((subscribe) => {
      subscribe.next('faketoken');
      subscribe.complete();
    });
  }

  findTracksRecommendations() {
    return new Observable((subscribe) => {
      subscribe.next(['Faixa 1', 'Faixa 2']);
      subscribe.complete();
    });
  }
}
