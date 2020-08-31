import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { Stores } from 'app/constants';
import { ReleaseModel } from 'app/models/ReleaseModel';
import { ReleaseItem } from 'app/components/molecules/ReleaseItem';
import { Container } from './Releases.styled';
import { withLoadingStore } from 'app/hoc';
import Heads from 'app/components/atoms/Heads';

export interface ReleasesProps extends RouteComponentProps<any> {
  data: ReleaseModel[];
}

export const ReleasesComponent: FC<ReleasesProps> = ({ data }) => {
  if (data) {
    return (
      <Container>

        <Heads url={window.document.location.href} title="Releases" conglomerateTitle />
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
        <Heads title="Releases" conglomerateTitle />
        <p>No releases to show here...</p>
      </Container>
    )
  }
}

export const Releases = withLoadingStore(Stores.releases)(ReleasesComponent);

export default Releases;