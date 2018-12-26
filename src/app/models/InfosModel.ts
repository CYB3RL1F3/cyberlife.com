import { observable } from 'mobx';

interface Bio {
  content: string;
  intro: string;
}

export class InfosModel {
  readonly id: number;
  @observable public name: string;
  @observable public bio: Bio;
  @observable public info: string;
  @observable public labels: string[];
  @observable public picture: string;
  @observable public RA: string;
  @observable public facebook: string;
  @observable public twitter: string;
  @observable public discogs: string;
  @observable public soundcloud: string;

  constructor(infos: any) {
    Object.keys(infos).forEach(
      (key: string): void => {
        this[key] = infos[key];
      }
    );
  }
}

export default InfosModel;
