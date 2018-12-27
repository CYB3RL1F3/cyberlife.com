import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ChartStore } from 'app/stores';
import { STORE_CHART } from 'app/constants';
import { Title } from 'types/charts';
import { ChartItem } from 'app/components/molecules/ChartItem';
import { Container } from './Charts.styled';
import ChartModel from '../../models/ChartModel';
import { withLoadingStore } from 'app/hoc';

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
            (track: Title): JSX.Element => (
              <ChartItem title={track.title} label={track.label} />
            )
          )}
        </Container>
      );
    } else {
      return <div>No content </div>;
    }
  }
}

export const Charts = withLoadingStore(STORE_CHART)(ChartsComponent);
