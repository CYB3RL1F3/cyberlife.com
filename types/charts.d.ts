export interface Track {
  id: string;
  artist: string;
  title: string;
  label: string;
  remix: string;
  cover: string;
  RA_link: string;
}

export interface Tracks extends Array<Track> {}
