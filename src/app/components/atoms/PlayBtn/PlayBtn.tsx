import React, { FC, memo } from 'react';
import { Container, Cover, PlayBtnProps, IconPlay } from './PlayBtn.styled';

export const PlayBtn: FC<PlayBtnProps> = memo((props) => (
  <Container {...props}>
    <Cover hasBackground={typeof props.backgroundImage !== "string"}>
      <IconPlay {...props} />
    </Cover>
  </Container>
)); 

export default PlayBtn;