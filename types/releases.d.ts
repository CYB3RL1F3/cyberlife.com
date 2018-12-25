export interface Track {
  title: string;
  duration: string;
  position: number;
}

export interface Tracks extends Array<Track> {}
