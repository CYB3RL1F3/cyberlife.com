import * as React from 'react';
import { Video, VideoHandler } from './BackgroundVideo.styled';
const bg_mp4 = require('assets/videos/bg.mp4');
const bg_webm = require('assets/videos/bg.webm');

type BackgroundVideoState = {
  videoLoading: boolean;
};

export class BackgroundVideo extends React.Component<{}, BackgroundVideoState> {
  state = { videoLoading: true };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ videoLoading: false });
    }, 150);
  }
  render() {
    if (this.state.videoLoading) return null;
    return (
      <VideoHandler>
        <Video autoPlay loop="loop" muted="muted">
          <source src={bg_webm} type="video/webm" />
          <source src={bg_mp4} type="video/mp4" />
        </Video>
      </VideoHandler>
    );
  }
}
