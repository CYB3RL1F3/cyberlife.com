import React, { FC, memo, Fragment } from 'react';
import routes, { RouteType } from 'app/routes';
import { Dash, NavContainer, Link } from './Nav.styled';
import { useBooleanDelaySwitch } from 'app/hooks/effects';

export const Nav: FC = memo(() => {
  const initiated = useBooleanDelaySwitch(1000);
  const className = initiated ? "loaded" : "";
  return (
    <NavContainer className={className}>
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
  )
});
