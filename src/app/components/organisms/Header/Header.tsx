import React, { FC, memo } from 'react';
import { Container, Cyberlife, Link } from './Header.styled';
import { Nav, MenuBtn } from 'app/components/molecules';
import {
  DesktopAndTabletsMediaQuery,
  MobileMediaQuery
} from 'app/components/atoms/Responsive';
import { paths } from "app/paths";

type HeaderProps = {};

export const Header: FC<
  HeaderProps
> = memo((): JSX.Element => (
  <Container>
    <Cyberlife>
      <Link path={paths.podcasts}>CYBERLIFE</Link>
    </Cyberlife>
    <DesktopAndTabletsMediaQuery>
      <Nav />
    </DesktopAndTabletsMediaQuery>
    <MobileMediaQuery>
      <MenuBtn />
    </MobileMediaQuery>
  </Container>
));
