import React, { FC, lazy, Suspense } from 'react';
import { theme, ThemeProvider } from 'app/theme';
import { observer } from 'mobx-react';
import { AppLoader } from 'app/components';
import { useAppStore } from 'app/hooks/stores';
const App = lazy(() => import('app/containers/App'));

require('assets/main.css');

export const Root: FC = observer(({ children }) => {
  const { loaded } = useAppStore();
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<AppLoader />}>
        {loaded ? <App>{children}</App> : <AppLoader />}
      </Suspense>
    </ThemeProvider>
  );
});