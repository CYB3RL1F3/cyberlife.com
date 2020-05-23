import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { Stores } from 'app/constants';
import { ChartItem } from 'app/components/molecules/ChartItem';
import { Container, Unavailable } from './Charts.styled';
import ChartModel from 'app/models/ChartModel';
import { withLoadingStore } from 'app/hoc';
import { Title } from 'types/charts';

export interface ChartProps extends RouteComponentProps<any> {
  data: ChartModel;
}

export const ChartsComponent: FC<ChartProps> = ({ data }) => {
  if (data) {
    return (
      <Container>
        {data.titles.map(
          (track: Title, index: number): JSX.Element => (
            <ChartItem
              key={index}
              index={index}
              title={track.title}
              label={track.label}
              link={track.link}
            />
          )
        )}
      </Container>
    );
  } else {
    return (
      <Container>
        <Unavailable>Cyberlife's RA chart is not available... :(</Unavailable>
      </Container>
    )
  }
}

export const Charts = withLoadingStore(Stores.chart)(ChartsComponent);
