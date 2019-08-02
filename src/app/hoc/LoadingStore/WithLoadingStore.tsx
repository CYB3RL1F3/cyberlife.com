import * as React from 'react';
import * as Sentry from '@sentry/browser';
import { inject, observer } from 'mobx-react';
import { Loading, Error } from 'app/components/atoms';
import { STORE_ROUTER } from 'app/constants/stores';
import { InitializableStore } from 'app/stores/stores';

export const withLoadingStore = (storeName: string) => (
  WrappedComponent: React.ComponentType
) => (props) => {
  @inject(storeName, STORE_ROUTER)
  @observer
  class Loadable extends React.Component {
    componentDidMount() {
      const store: InitializableStore = this.props[storeName];
      store.init();
    }

    componentDidCatch(error, errorInfo) {
      this.fail(error, errorInfo);
    }

    fail = (error, errorInfo) => {
      Sentry.withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key]);
        });
        Sentry.captureException(error);
      });
    };
    render() {
      const { init, loading, error } = this.props[storeName];
      if (loading) {
        return <Loading />;
      } else if (error) {
        this.fail(error, {});
        return (
          <Error
            init={init}
            message={
              'Impossible to load content. Seems to meet a problem with the data provider.'
            }
          />
        );
      } else {
        return (
          <WrappedComponent
            {...props}
            {...this.props}
            {...this.props[storeName]}
          />
        );
      }
    }
  }

  return <Loadable />;
};
