import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { ChartStore } from 'app/stores';
import { STORE_ROUTER, STORE_CHART } from 'app/constants';
import { Title } from 'types/charts';
import { ChartItem } from 'app/components/molecules/ChartItem';
import { Container } from './Charts.styled';

export interface ChartProps extends RouteComponentProps<any> {
  /** MobX Stores will be injected via @inject() **/
  // [STORE_ROUTER]: RouterStore;
  // [STORE_RELEASE]: ChartsStore;
}

export interface chartState {}

@inject(STORE_CHART, STORE_ROUTER)
@observer
export class Charts extends React.Component<ChartProps, chartState> {
  constructor(props: ChartProps, context: any) {
    super(props, context);
    this.init();
  }

  init() {
    const chartStore: ChartStore = this.props[STORE_CHART] as ChartStore;
    chartStore.loadCharts();
  }

  render() {
    const chartStore = this.props[STORE_CHART] as ChartStore;
    const { data } = chartStore;
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
      return <div>LOADINGUE </div>;
    }
  }
}
