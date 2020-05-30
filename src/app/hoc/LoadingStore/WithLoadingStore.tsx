

import React, { PureComponent, ComponentType, Suspense } from 'react';
import { captureException, withScope } from '@sentry/browser';
import { observer, inject } from 'mobx-react';
import { Loading, Error as ErrorComponent } from 'app/components/atoms';
import { InitializableStore } from 'app/stores/stores';
import { Stores } from "app/constants/stores";

export const withLoadingStore = (storeName: string) => (
  WrappedComponent: ComponentType
) => (props) => {
  @inject(storeName, Stores.router)
  @observer
  class WithLoadingStoreComponent extends PureComponent {
    componentDidMount() {
      const store: InitializableStore = this.props[storeName];
      store.init();
    }

    componentDidCatch(error, errorInfo) {
      this.fail(error, errorInfo);
    }

    fail = (error, errorInfo) => {
      withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key]);
        });
        captureException(error);
      });
    };
    render() {
      const { init, loading, error } = this.props[storeName];
      if (loading) {
        return <Loading />;
      } else if (error) {
        this.fail(error, {});
        return (
          <ErrorComponent
            init={init}
            message={
              'Impossible to load content. Seems to meet a problem with the data provider.'
            }
          />
        );
      } else {
        return (
          <Suspense fallback={<Loading />}>
            <WrappedComponent
              {...props}
              {...this.props}
              {...this.props[storeName]}
            />
          </Suspense>
        );
      }
    }
  }

  return <WithLoadingStoreComponent />;
};
