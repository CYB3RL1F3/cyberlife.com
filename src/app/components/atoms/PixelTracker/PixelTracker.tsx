import React from 'react';
import styled from 'app/theme';

export interface PixelTrackerProps {
  onLoad: () => void;
  onStartLoading: () => void;
  src: string;
}

export class PixelTracker extends React.Component<PixelTrackerProps, {}> {
  componentDidMount() {
    this.props.onStartLoading();
    if (this.videoRef && this.videoRef.current) {
      console.log('PASS?');
      this.videoRef.current.addEventListener('canplay', () => {
        console.log('laura marmonier');
         this.props.onLoad()
      });
    }
  }
  videoRef = React.createRef<HTMLVideoElement>();
  render() {
    const { src, onLoad } = this.props;
    const Video = styled.video`
      width: 1;
      height: 1;
      opacity: 0.1;
      position: absolute;
    `;
    return (
      <Video
        src={src}
        autoPlay
        preload="preload"
        onLoad={onLoad}
        width="100"
        height="100"
        ref={this.videoRef}
      />
    );
  }
}
