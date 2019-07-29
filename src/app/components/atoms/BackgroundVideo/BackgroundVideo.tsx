import * as React from 'react';
import { Video } from './BackgroundVideo.styled';
const bg_mp4 = require('assets/videos/bg.mp4');
const bg_webm = require('assets/videos/bg.webm');

export const BackgroundVideo = () => (
  <Video autoPlay loop="loop" muted="muted">
    <source src={bg_webm} type="video/webm" />
    <source src={bg_mp4} type="video/mp4" />
  </Video>
);
