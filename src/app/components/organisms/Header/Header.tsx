import * as React from 'react';
import { Container, Cyberlife, Link } from './Header.styled';
import { Nav } from 'app/components/molecules';
import { MenuBtn } from 'app/components/atoms/MenuBtn';
import MediaQuery from 'react-responsive';
import { sizes } from 'app/theme';

type HeaderProps = {};

export const Header: React.StatelessComponent<
  HeaderProps
> = (): JSX.Element => (
  <Container>
    <Cyberlife>
      <Link path="/">CYBERLIFE</Link>
    </Cyberlife>
    <MediaQuery query={`(min-width: ${sizes.mobile / 16}em)`}>
      <Nav />
    </MediaQuery>
    <MediaQuery query={`(max-width: ${sizes.mobile / 16}em)`}>
      <MenuBtn />
    </MediaQuery>
  </Container>
);
