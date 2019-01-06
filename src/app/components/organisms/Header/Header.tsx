import * as React from 'react';
import { Container, Cyberlife, Link } from './Header.styled';
import { Nav } from 'app/components/molecules';
import { MenuBtn } from 'app/components/atoms/MenuBtn';
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
