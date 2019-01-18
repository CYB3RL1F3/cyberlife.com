import * as React from 'react';
import { PlayBtnProps, Container, Cover, IconPlay } from './PlayBtn.styled';

export const PlayBtn: React.StatelessComponent<PlayBtnProps> = (props) => {
  return (
    <Container {...props}>
      <Cover>
        <IconPlay {...props} />
      </Cover>
    </Container>
  );
};
