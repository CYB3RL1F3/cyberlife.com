import * as React from 'react';
import { theme, ThemeProvider } from 'app/theme';
import { App } from 'app/containers';
import { inject, observer } from 'mobx-react';
import { STORE_ROUTER, STORE_APP, STORE_INFOS } from 'app/constants/stores';
import { AppStore } from 'app/stores';
import { RouterStore } from 'app/stores';
import { AppLoader } from '../AppLoader';

require('assets/main.css');

interface RootProps {
  appStore?: AppStore;
  router?: RouterStore;
}

@inject(STORE_ROUTER, STORE_INFOS, STORE_APP)
@observer
export class Root extends React.Component<RootProps, {}> {
  render() {
    const appStore = this.props[STORE_APP];
    const loaded = appStore && appStore.loaded;
    return (
      <ThemeProvider theme={theme}>
        {loaded ? <App>{this.props.children}</App> : <AppLoader />}
      </ThemeProvider>
    );
  }
}
