import { observable } from 'mobx';
import { string } from 'prop-types';

export interface Track {
  title: string;
  url: string;
  description: string;
  artwork: string;
  download: string;
  downloadable: boolean;
  duration: number;
}

export interface Tracks extends Array<Track> {}
