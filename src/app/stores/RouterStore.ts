import { History } from 'history';
import { observable, makeObservable } from 'mobx';
import {
  RouterStore as BaseRouterStore,
  syncHistoryWithStore
} from 'mobx-react-router';

export class RouterStore extends BaseRouterStore {
  history: History = null;
  constructor(history?: History) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
    makeObservable(this, {
      history: observable,
      location: observable
    });
  }
}

export default RouterStore;
