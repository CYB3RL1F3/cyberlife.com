import * as React from 'react';
import styled from 'app/theme';

export interface PixelTrackerProps {
  onLoad: () => void;
  onStartLoading: () => void;
  src: string;
}

export class PixelTracker extends React.Component<PixelTrackerProps, {}> {
  componentDidMount() {
    this.props.onStartLoading();
  }
  render() {
    const { src, onLoad } = this.props;
    const Img = styled.img`
      width: 1;
      height: 1;
      opacity: 0.1;
      position: absolute;
    `;
    return <Img src={src} alt="" onLoad={onLoad} width="1" height="1" />;
  }
}
