import React, { FC } from 'react';
import { theme, ThemeProvider } from 'app/theme';
import { observer } from 'mobx-react';
import { AppLoader } from 'app/components';
import { App } from 'app/containers';
import { useAppStore } from 'app/hooks/stores';

require('assets/main.css');

export const Root: FC = observer(({ children }) => {
  const { loaded } = useAppStore();
  return (
    <ThemeProvider theme={theme}>
      {loaded ? <App>{children}</App> : <AppLoader />}
    </ThemeProvider>
  );
});