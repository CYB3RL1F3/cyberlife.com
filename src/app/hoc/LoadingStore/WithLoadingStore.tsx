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
      store.init();
    }
    render() {
      const { init, loading, error, data } = this.props[storeName];
      console.log(this.props[storeName], storeName);
      if (loading) {
        return <Loading />;
      } else if (error) {
        console.log(error);
        return (
          <Error
            init={init}
            message={'Impossible to load content, because the API seems down.'}
          />
        );
      } else {
        return <WrappedComponent {...props} {...this.props} data={data} />;
      }
    }
  }

  return <Loadable />;
};
