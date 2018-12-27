import * as React from 'React';
import { inject, observer } from 'mobx-react';
import { Loader, Error } from 'app/components/atoms';
import { STORE_ROUTER } from '../../constants/stores';

export const withStore = (store: string) => (
  WrappedComponent: React.ComponentType
) => (props) => {
  @inject(store, STORE_ROUTER)
  @observer
  class Loadable extends React.Component {
    render() {
      const { loading, error, data } = this.props[store];
      if (loading) {
        return <Loader />;
      } else if (error) {
        return <Error message={error.message} />;
      } else {
        return <WrappedComponent {...props} {...this.props} data={data} />;
      }
    }
  }

  return <Loadable />;
};
