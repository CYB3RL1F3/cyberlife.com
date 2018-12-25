import * as React from 'react';
import routes, { RouteType } from 'app/routes';
import { Dash, NavContainer, Link } from './Nav.styled';

export const Nav: React.StatelessComponent = () => (
  <NavContainer>
    {routes.map(
      (route: RouteType, index: number): JSX.Element => (
        <>
          {index > 0 && <Dash key={index} />}
          <Link key={`nav__${route.key}`} path={route.path} underlineCurrent>
            {route.label}
          </Link>
        </>
      )
    )}
  </NavContainer>
);
