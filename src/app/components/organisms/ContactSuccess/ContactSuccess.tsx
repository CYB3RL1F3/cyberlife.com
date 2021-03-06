import React, { FC, memo, MouseEvent, lazy, useRef, Suspense, useCallback } from 'react';

import { Container, H3, P, LottieHandler, A } from './ContactSuccess.styled';
import Heads from 'app/components/atoms/Heads';
const Lottie = lazy(() => import('react-lottie'));
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
  
  const animation = useRef<any>(null)

  const onReturn = useCallback((e) => {
    animation.current && animation.current.stop();
    returnAction(e);
  }, []);
  return (
    <Container>
      <Heads title="Contact" conglomerateTitle url={window.document.location.href} />
      <H3>Thanks for contact !</H3>
      <P>
        Your message has been <u>successfully expedied</u>. <br /> You'll get
        replied as soon as possible.
      </P>
      <LottieHandler>
        <Suspense fallback={<div />}>
          <Lottie eventListeners={[]} ref={animation} options={config} height={200} width={200} /> 
        </Suspense>
      </LottieHandler>
      <P>
        <A onClick={onReturn}>Send another one</A>
      </P>
    </Container>
  );
});

export default ContactSuccess;