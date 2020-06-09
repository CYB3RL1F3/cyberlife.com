import { observable } from 'mobx';


export class PostModel {
  readonly id: number;
  @observable public title: string;
  @observable public illustration: string;
  @observable public content: string;
  @observable public subtitle: string;
  @observable public createdAt: string;

  constructor(infos: any) {
    Object.keys(infos).forEach(
      (key: string): void => {
        this[key] = infos[key];
      }
    );
  }
}

export default PostModel;
