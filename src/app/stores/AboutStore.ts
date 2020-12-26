import { observable, action, makeObservable } from 'mobx';
import { getPosts } from 'app/actions';
import { InitializableStore } from './stores';
import { captureException } from '@sentry/browser';
import PostModel from 'app/models/PostModel';

export class AboutStore implements InitializableStore {

  constructor() {
    makeObservable(this, {
      loading: observable,
      error: observable,
      data: observable,
      init: action,
      loadPost: action,
      onPostsLoaded: action.bound,
      onPostsError: action.bound
    })
  }
  public loading: boolean = false;
  public error: string = null;
  public data: PostModel = null;

  init = () => !this.data && this.loadPost();

  loadPost = () => {
    this.loading = true;
    this.error = null;
    getPosts()
      .then(this.onPostsLoaded)
      .catch(this.onPostsError);
  };

  onPostsLoaded = (response) => {
    try {
      this.data = new PostModel(response.data[0]);
      this.loading = false;
    } catch (e) {
      this.onPostsError(e);
    }
  };

  onPostsError = (e) => {
    captureException(e);
    this.error = e.toString();
    this.loading = false;
  };
}

export default AboutStore;
