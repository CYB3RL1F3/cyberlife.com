import * as React from 'react';
import { Container, Cyberlife, Link } from './Header.styled';
import { Nav } from 'app/components/molecules';

export const Header: React.StatelessComponent = (): JSX.Element => (
  <Container>
    <Cyberlife>
      <Link path="/">CYBERLIFE</Link>
    </Cyberlife>
    <Nav />
  </Container>
);
