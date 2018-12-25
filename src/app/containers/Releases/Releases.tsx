import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { ReleasesStore } from 'app/stores';
import { STORE_ROUTER, STORE_RELEASES } from 'app/constants';
import { ReleaseModel } from 'app/models/releaseModel';

export interface releasesProps extends RouteComponentProps<any> {
  /** MobX Stores will be injected via @inject() **/
  // [STORE_ROUTER]: RouterStore;
  // [STORE_RELEASE]: ReleasesStore;
}

export interface releasesState {}

@inject(STORE_RELEASES, STORE_ROUTER)
@observer
export class Releases extends React.Component<releasesProps, releasesState> {
  constructor(props: releasesProps, context: any) {
    super(props, context);
    this.init();
  }

  init() {
    const releasesStore = this.props[STORE_RELEASES] as ReleasesStore;
    releasesStore.loadReleases();
  }

  render() {
    const releasesStore = this.props[STORE_RELEASES] as ReleasesStore;
    const { data } = releasesStore;
    console.log(releasesStore);
    if (data) {
      return (
        <div>
          {data.map(
            (release: ReleaseModel): JSX.Element => (
              <div>{release.title} </div>
            )
          )}
        </div>
      );
    } else {
      return <div>LOADINGUE </div>;
    }
  }
}
