import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { Root } from 'app/containers/Root';
import routes, { RouteType } from './routes';
import { Err404 } from './containers/Err404';

// render react DOM
export const App = hot(module)(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
        {routes.map(
          (route: RouteType): JSX.Element => (
            <Route
              key={`route__${route.key}`}
              exact
              path={route.path}
              component={route.component}
            />
          )
        )}
        <Route path="*" component={Err404} status={404} />
      </Switch>
    </Router>
  </Root>
));
