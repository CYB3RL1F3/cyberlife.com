import * as React from 'react';
import { theme, ThemeProvider } from 'app/theme';
import { App } from 'app/containers';

require('assets/main.css');

interface RootProps {}

export class Root extends React.Component<RootProps, {}> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <App>{this.props.children}</App>
      </ThemeProvider>
    );
  }
}
