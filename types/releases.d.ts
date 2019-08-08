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
}

export interface Tracks extends Array<Track> {}
