import React, { Suspense, createElement, lazy } from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { Root } from 'app/Root';
import routes, { RouteType } from './routes';
import Err404 from './containers/Err404';

import { GlobalStyle } from './theme';
export const getComponent = (component: string) => lazy(() => import(`app/containers/${component}`))

export const RouteComponent = ({ exact = false, path, component }) => (
  <Suspense fallback={<div />}>
    <Route
      exact={exact}
      path={path}
      render={props => createElement(component, props)}
    />
  </Suspense>
)
// render react DOM
export const App = hot(module)(({ history }) => (
  <Root>
    <GlobalStyle />
    <Router history={history}>
      <Switch>
        {routes.map(
          (route: RouteType): JSX.Element => (
            <RouteComponent
              key={`route__${route.key}`}
              exact
              path={route.path}
              component={getComponent(route.component)}
            />
          )
        )}
        <Route path="*" component={Err404} status={404} />
      </Switch>
    </Router>
  </Root>
));
