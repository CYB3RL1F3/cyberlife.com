import React, { PureComponent, createRef } from 'react';
import styled from 'app/theme';

const src = "https://res.cloudinary.com/hiilqldcr/video/upload/v1590399050/bg_webm.webm";

export interface PixelTrackerProps {
  onLoad: () => void;
  onStartLoading: () => void;
}

export class PixelTracker extends PureComponent<PixelTrackerProps, {}> {
  componentDidMount() {
    this.props.onStartLoading();
    if (this.videoRef && this.videoRef.current) {
      this.videoRef.current.addEventListener('canplay', () => {
        this.props.onLoad()
      });
    }
  }
  
  videoRef = createRef<HTMLVideoElement>();
  render() {
    const { onLoad } = this.props;
    
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
