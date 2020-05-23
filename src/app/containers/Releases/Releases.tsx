import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { Stores } from 'app/constants';
import { ReleaseModel } from 'app/models/ReleaseModel';
import { ReleaseItem } from 'app/components/molecules/ReleaseItem';
import { Container } from './Releases.styled';
import { withLoadingStore } from 'app/hoc';

export interface ReleasesProps extends RouteComponentProps<any> {
  data: ReleaseModel[];
}

export const ReleasesComponent: FC<ReleasesProps> = ({ data }) => {
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
    return (
      <Container>
        <p>No releases to show here...</p>
      </Container>
    )
  }
}

export const Releases = withLoadingStore(Stores.releases)(ReleasesComponent);
