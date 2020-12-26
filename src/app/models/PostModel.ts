import { makeObservable, observable } from 'mobx';
export class PostModel {
  readonly id: number = null;
  public title: string = null;
  public illustration: string = null;
  public content: string = null;
  public subtitle: string = null;
  public createdAt: string = null;

  constructor(infos: any) {
    Object.keys(infos).forEach(
      (key: string): void => {
        this[key] = infos[key];
      }
    );
    makeObservable(this, {
      title: observable,
      illustration: observable,
      content: observable,
      subtitle: observable,
      createdAt: observable
    });
  }
}

export default PostModel;
