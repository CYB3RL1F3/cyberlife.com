import React from 'react';
import { RouteComponentProps } from 'react-router';
import { ReleasesStore } from 'app/stores';
import { STORE_RELEASES } from 'app/constants';
import { ReleaseModel } from 'app/models/ReleaseModel';
import { ReleaseItem } from 'app/components/molecules/ReleaseItem';
import { Container } from './Releases.styled';
import { withLoadingStore } from 'app/hoc';

export interface ReleasesProps extends RouteComponentProps<any> {
  [STORE_RELEASES]: ReleasesStore;
  data: ReleaseModel[];
}

export class ReleasesComponent extends React.Component<ReleasesProps, {}> {
  constructor(props: ReleasesProps, context: any) {
    super(props, context);
  }

  render() {
    const { data } = this.props;
    if (data) {
      return (
        <Container>
          {data.map(
            (release: ReleaseModel, index: number): JSX.Element => (
              <ReleaseItem index={index} key={release.id} release={release} />
            )
          )}
        </Container>
      );
    } else {
      return <div />;
    }
  }
}

export const Releases = withLoadingStore(STORE_RELEASES)(ReleasesComponent);
