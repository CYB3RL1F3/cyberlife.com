import * as React from 'react';
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
      if (!store.data) store.init();
    }
    render() {
      const { loading, error, data } = this.props[storeName];
      if (loading) {
        return <Loading />;
      } else if (error) {
        return <Error message={error.message} />;
      } else {
        return <WrappedComponent {...props} data={data} />;
      }
    }
  }

  return <Loadable />;
};
