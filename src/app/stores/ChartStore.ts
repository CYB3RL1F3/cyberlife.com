import { observable, action } from 'mobx';
import { ChartModel } from 'app/models';
import { getChart } from 'app/actions';
import { InitializableStore } from './stores';

export class ChartStore implements InitializableStore {
  @observable public loading: boolean;
  @observable public error: string;
  @observable public data: ChartModel;

  getFirstChart = (charts): ChartModel => {
    const keys = Object.keys(charts);
    return new ChartModel(charts[keys[0]]);
  };

  @action
  init = () => this.loadCharts();

  @action
  loadCharts = () => {
    this.loading = true;
    getChart()
      .then(this.onChartsLoaded)
      .catch(this.onChartsError);
  };

  @action.bound
  onChartsLoaded = (response) => {
    try {
      this.data = this.getFirstChart(response.data);
      this.loading = false;
    } catch (e) {
      this.onChartsError(e);
    }
  };

  @action.bound
  onChartsError = (e) => {
    this.error = e.toString();
    this.loading = false;
  };
}

export default ChartStore;
