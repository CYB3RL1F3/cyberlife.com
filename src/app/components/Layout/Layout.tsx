import React, { lazy, Suspense, memo } from 'react';
import { Bg } from './Layout.styled';
import { Background } from 'app/components/SharedStyled';

const BackgroundVideo = lazy(() => import('app/components/atoms/BackgroundVideo'));
const ChildrenHandler = lazy(() => import('./ChildrenHandler'));

export const Layout = memo(({ children }): JSX.Element => (
  <Suspense fallback={<Background />}>
    <Background>
        <Bg children={<BackgroundVideo />} />
      <ChildrenHandler children={children} />
    </Background>
  </Suspense>
));
