import * as React from 'react';
import { Container, Cover, IconPlay } from './PlayBtn.styled';

export interface PlayBtnProps {
  backgroundImage: string;
  playing: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export const PlayBtn: React.StatelessComponent<PlayBtnProps> = (props) => {
  return (
    <Container {...props}>
      <Cover>
        <IconPlay {...props} />
      </Cover>
    </Container>
  );
};
