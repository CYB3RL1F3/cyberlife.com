import { observable } from 'mobx';
import TrackModel from './TrackModel';

export class PodcastModel {
  readonly id: number;
  @observable public title: string;
  @observable public description: string;
  @observable public genre: string;
  @observable public taglist: string[];
  @observable public artwork: string;
  @observable public soundcloud: string;
  @observable public tracks: TrackModel[];

  constructor(podcast: any) {
    Object.keys(podcast).forEach(
      (key: string): void => {
        if (key === 'tracks') {
          this.tracks = podcast.tracks.map(
            (track): TrackModel => new TrackModel(track, podcast.artwork.replace('large', 't500x500'))
          );
        } else {
          this[key] = podcast[key];
        }
      }
    );
  }
}

export default PodcastModel;
