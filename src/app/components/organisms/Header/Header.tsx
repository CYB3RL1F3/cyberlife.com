import React from 'react';
import { Container, Cyberlife, Link } from './Header.styled';
import { Nav, MenuBtn } from 'app/components/molecules';
import {
  DesktopAndTabletsMediaQuery,
  MobileMediaQuery
} from 'app/components/atoms/Responsive';

type HeaderProps = {};

export const Header: React.StatelessComponent<
  HeaderProps
> = (): JSX.Element => (
  <Container>
    <Cyberlife>
      <Link path="/">CYBERLIFE</Link>
    </Cyberlife>
    <DesktopAndTabletsMediaQuery>
      <Nav />
    </DesktopAndTabletsMediaQuery>
    <MobileMediaQuery>
      <MenuBtn />
    </MobileMediaQuery>
  </Container>
);
