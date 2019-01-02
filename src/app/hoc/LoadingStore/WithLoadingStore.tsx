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
    componentDidCatch(e) {
      console.log(e);
    }
    render() {
      const { init, loading, error } = this.props[storeName];
      console.log(this.props[storeName].currentTrack);
      if (loading) {
        return <Loading />;
      } else if (error) {
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
