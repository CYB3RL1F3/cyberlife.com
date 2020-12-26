import { makeObservable, observable } from 'mobx';

interface Bio {
  content: string;
  intro: string;
}

export class InfosModel {
  readonly id: number = 0;
  public name: string = null;
  public bio: Bio = null;
  public info: string = null;
  public labels: string[] = null;
  public picture: string = null;
  public RA: string = null;
  public facebook: string = null;
  public twitter: string = null;
  public discogs: string = null;
  public soundcloud: string = null;

  constructor(infos: any) {
    makeObservable(this, {
      name: observable,
      bio: observable.deep,
      info: observable,
      labels: observable.deep,
      picture: observable,
      RA: observable,
      facebook: observable,
      twitter: observable,
      discogs: observable,
      soundcloud: observable,
    });
    Object.keys(infos).forEach(
      (key: string): void => {
        this[key] = infos[key];
      }
    );
    
  }
}

export default InfosModel;
