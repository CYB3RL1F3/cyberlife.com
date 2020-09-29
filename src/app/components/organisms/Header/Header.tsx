import React, { FC, memo } from 'react';
import { Container, Cyberlife, Link } from './Header.styled';
import { Nav, MenuBtn } from 'app/components/molecules';
import {
  DesktopAndTabletsMediaQuery,
  MobileMediaQuery
} from 'app/components/atoms/Responsive';
import { paths } from "app/paths";
import { useBooleanDelaySwitch } from 'app/hooks/effects';

type HeaderProps = {};

export const Header: FC<
  HeaderProps
> = memo((): JSX.Element => {
  const initiated = useBooleanDelaySwitch(1000);
  const className = initiated ? 'loaded' : '';
  return (
    <Container>
      <Cyberlife className={className}>
        <Link path={paths.podcasts}>CYBERLIFE</Link>
      </Cyberlife>
      <DesktopAndTabletsMediaQuery>
        <Nav />
      </DesktopAndTabletsMediaQuery>
      <MobileMediaQuery>
        <MenuBtn />
      </MobileMediaQuery>
    </Container>
  )
});
