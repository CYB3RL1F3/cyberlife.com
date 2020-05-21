import React from 'react';
import { RouteComponentProps } from 'react-router';
import { ChartStore } from 'app/stores';
import { STORE_CHART } from 'app/constants';
import { ChartItem } from 'app/components/molecules/ChartItem';
import { Container } from './Charts.styled';
import ChartModel from 'app/models/ChartModel';
import { withLoadingStore } from 'app/hoc';
import { Title } from 'types/charts';

export interface ChartProps extends RouteComponentProps<any> {
  /** MobX Stores will be injected via @inject() **/
  [STORE_CHART]: ChartStore;
  data: ChartModel;
}

export interface chartState {}

export class ChartsComponent extends React.Component<ChartProps, chartState> {
  constructor(props: ChartProps, context: any) {
    super(props, context);
  }

  render() {
    const { data } = this.props;
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
      return <div />;
    }
  }
}

export const Charts = withLoadingStore(STORE_CHART)(ChartsComponent);
