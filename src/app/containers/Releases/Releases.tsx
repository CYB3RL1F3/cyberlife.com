import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { ReleasesStore } from 'app/stores';
import { STORE_ROUTER, STORE_RELEASES } from 'app/constants';
import { ReleaseModel } from 'app/models/releaseModel';
import { ReleaseItem } from 'app/components/molecules';
import { Container } from './Releases.styled';

export interface ReleasesProps extends RouteComponentProps<any> {
  /** MobX Stores will be injected via @inject() **/
  // [STORE_ROUTER]: RouterStore;
  // [STORE_RELEASE]: ReleasesStore;
}

export interface releasesState {}

@inject(STORE_RELEASES, STORE_ROUTER)
@observer
export class Releases extends React.Component<ReleasesProps, releasesState> {
  constructor(props: ReleasesProps, context: any) {
    super(props, context);
    this.init();
  }

  init() {
    const releasesStore = this.props[STORE_RELEASES] as ReleasesStore;
    releasesStore.loadReleases();
  }

  render() {
    const releasesStore: ReleasesStore = this.props[
      STORE_RELEASES
    ] as ReleasesStore;
    const { data } = releasesStore;
    if (data) {
      return (
        <Container>
          {data.map(
            (release: ReleaseModel): JSX.Element => (
              <ReleaseItem
                key={release.id}
                title={release.name}
                info={release.releaseDate}
                tracks={release.tracklist}
              />
            )
          )}
        </Container>
      );
    } else {
      return <div>LOADINGUE </div>;
    }
  }
}
