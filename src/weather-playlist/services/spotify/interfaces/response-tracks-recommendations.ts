import { ISeed } from './seed';
import { ITrack } from './track';

export interface IResponseTracksRecommendations {
  tracks: ITrack[];
  seeds: ISeed[];
}
