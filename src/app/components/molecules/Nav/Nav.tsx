import React, { FC, memo, Fragment } from 'react';
import routes, { RouteType } from 'app/routes';
import { Dash, NavContainer, Link } from './Nav.styled';

export const Nav: FC = memo(() => (
  <NavContainer>
    {routes.map(
      (route: RouteType, index: number): JSX.Element =>
        route.menu && (
          <Fragment key={`nav__${route.key}`}>
            {index > 0 && <Dash key={index} />}
            <Link path={route.path} underlineCurrent>
              {route.label}
            </Link>
          </Fragment>
        )
    )}
  </NavContainer>
));
