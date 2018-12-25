import { observable, action } from 'mobx';
import { ChartModel } from 'app/models';
import { getChart } from 'app/actions';

export class ChartStore {
  @observable public loading: boolean;
  @observable public error: string;
  @observable public data: ChartModel;

  getFirstChart = (charts): ChartModel => {
    const keys = Object.keys(charts);
    return new ChartModel(charts[keys[0]]);
  };

  @action
  loadCharts = () => {
    this.loading = true;
    getChart()
      .then(this.onChartsLoaded)
      .catch(this.onChartsError);
  };

  @action.bound
  onChartsLoaded = (response) => {
    this.data = this.getFirstChart(response.data);
    this.loading = false;
    console.log(this.data);
  };

  @action.bound
  onChartsError = (e) => {
    this.error = e.toString();
    this.loading = false;
  };
}

export default ChartStore;
