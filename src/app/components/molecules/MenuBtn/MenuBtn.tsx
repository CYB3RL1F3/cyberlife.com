import React, { FC, Suspense, useCallback, useState, memo, lazy } from 'react';
import { A, Img } from './MenuBtn.styled';
// import NavMobile from 'app/components/atoms/NavMobile';
const NavMobile = lazy(() => import('app/components/atoms/NavMobile'));

const MenuBtnIcon = require('assets/images/menu.svg').default;

export const MenuBtn: FC = memo(() => {
  const [opened, toggle] = useState<boolean>(false);
  const open = useCallback(() => toggle(true), [toggle]);
  const close = useCallback(() => toggle(false), [toggle]);
  
  return (
    <Suspense fallback={<div />}>
      <A onClick={open}>
        <Img src={MenuBtnIcon} alt="MENU" />
      </A>
      <NavMobile opened={opened} onClose={close} />
    </Suspense>
  );
})
