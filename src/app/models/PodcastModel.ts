import { makeObservable, observable } from 'mobx';
import TrackModel from './TrackModel';

export class PodcastModel {
  readonly id: number = null;
  public title: string = null;
  public description: string = null;
  public genre: string = null;
  public artwork: string = null;
  public soundcloud: string = null;
  public taglist: string[] = null;
  public tracks: TrackModel[] = null;

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
    makeObservable(this, {
      title: observable,
      description: observable,
      genre: observable,
      artwork: observable,
      soundcloud: observable,
      taglist: observable.deep,
      tracks: observable.deep,

    });
  }
}

export default PodcastModel;
