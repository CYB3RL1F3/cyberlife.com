import Stream from 'app/models/TrackModel';

export interface Artist {
  name: string;
  resource_url: string;
  id: number;
  role?: string;
}

export interface Track {
  title: string;
  duration: string;
  position: number;
  artists: Artist[];
  extraartists: Artist[];
  fullTitle: string;
  stream: Stream;
}

export interface Tracks extends Array<Track> {}
