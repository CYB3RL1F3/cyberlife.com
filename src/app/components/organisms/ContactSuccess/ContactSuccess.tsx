import React, { FC, memo, MouseEvent } from 'react';
import Lottie from 'react-lottie';
import { Container, H3, P, LottieHandler, A } from './ContactSuccess.styled';
import { Heads } from 'app/components/atoms';

const animationData = require('assets/lotties/mail.json');

interface ContactSuccessProps {
  returnAction: (e: MouseEvent) => void;
}

export const ContactSuccess: FC<ContactSuccessProps> = memo(({
  returnAction
}) => {
  const config = {
    loop: false,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Container>
      <Heads title="Contact" conglomerateTitle />
      <H3>Thanks for contact !</H3>
      <P>
        Your message has been <u>successfully expedied</u>. <br /> You'll get
        replied as soon as possible.
      </P>
      <LottieHandler>
        <Lottie options={config} height={200} width={200} />
      </LottieHandler>
      <P>
        <A onClick={returnAction}>Send another one</A>
      </P>
    </Container>
  );
});
