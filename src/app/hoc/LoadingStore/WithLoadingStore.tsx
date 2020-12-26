

import React, { ComponentType, useEffect, Suspense } from 'react';
import { captureException, withScope } from '@sentry/browser';
import { Loading, Error as ErrorComponent } from 'app/components/atoms';
import { InitializableStore } from 'app/stores/stores';
import { Stores } from "app/constants/stores";
import { useStore } from 'app/hooks/stores';
import { observer } from 'mobx-react';

interface LoadingStoreComponentProps {
  [storeName: string]: InitializableStore;
}
export const withLoadingStore = (storeName: Stores) => (
  WrappedComponent: ComponentType
) => observer((props) => {
  const WithLoadingStoreComponent: React.FC<LoadingStoreComponentProps> = observer(() => {
    const currentStore = useStore<InitializableStore>(storeName);
    const { init, loading, error } = currentStore;
    useEffect(() => {
      init();
    }, []);

    const fail = (error, errorInfo) => {
      withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key]);
        });
        captureException(error);
      });
      return (
        <ErrorComponent
          init={init}
          message={
            'Impossible to load content. Seems to meet a problem with the data provider.'
          }
        />
      );
    };
    if (loading) {
      return <Loading />;
    } else if (error) {
      return fail(error, {});
    } else {
      try {
        return (
          <Suspense fallback={<Loading />}>
            <WrappedComponent
              {...props}
              {...currentStore}
            />
          </Suspense>
        );
      } catch(e) {
        return fail(e, "error while rendering WrappedComponent");
      }
    }
  });
  return <WithLoadingStoreComponent />
});