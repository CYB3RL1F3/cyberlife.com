import * as React from 'react';
import { PlayBtnProps, Container, Cover, IconPlay } from './PlayBtn.styled';

export class PlayBtn extends React.Component<PlayBtnProps> {
  shouldComponentUpdate(nextProps: PlayBtnProps) {
    return (
      this.props.backgroundImage !== nextProps.backgroundImage ||
      nextProps.playing !== this.props.playing
    );
  }
  render() {
    return (
      <Container {...this.props}>
        <Cover>
          <IconPlay {...this.props} />
        </Cover>
      </Container>
    );
  }
}
