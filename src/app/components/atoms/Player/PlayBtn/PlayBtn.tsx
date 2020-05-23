import React, { FC, memo } from 'react';
import { PlayBtnProps, Container, Cover, IconPlay } from './PlayBtn.styled';

export const PlayBtn: FC<PlayBtnProps> = memo((props) => (
  <Container {...props}>
    <Cover>
      <IconPlay {...props} />
    </Cover>
  </Container>
)); 