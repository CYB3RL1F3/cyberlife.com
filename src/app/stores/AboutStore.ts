import { observable, action } from 'mobx';
import { getPosts } from 'app/actions';
import { InitializableStore } from './stores';
import { captureException } from '@sentry/browser';
import PostModel from 'app/models/PostModel';

export class AboutStore implements InitializableStore {
  @observable public loading: boolean;
  @observable public error: string;
  @observable public data: PostModel;

  @action
  init = () => !this.data && this.loadPost();

  @action
  loadPost = () => {
    this.loading = true;
    this.error = null;
    getPosts()
      .then(this.onPostsLoaded)
      .catch(this.onPostsError);
  };

  @action.bound
  onPostsLoaded = (response) => {
    try {
      this.data = new PostModel(response.data[0]);
      this.loading = false;
    } catch (e) {
      this.onPostsError(e);
    }
  };

  @action.bound
  onPostsError = (e) => {
    captureException(e);
    this.error = e.toString();
    this.loading = false;
  };
}

export default AboutStore;
