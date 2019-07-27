import { observable, action } from 'mobx';
import { ChartModel } from 'app/models';
import { getCharts } from 'app/actions';
import { InitializableStore } from './stores';

export class ChartStore implements InitializableStore {
  @observable public loading: boolean;
  @observable public error: string;
  @observable public data: ChartModel;

  @action
  init = () => !this.data && this.loadCharts();

  @action
  loadCharts = () => {
    this.loading = true;
    this.error = null;
    getCharts()
      .then(this.onChartsLoaded)
      .catch(this.onChartsError);
  };

  @action.bound
  onChartsLoaded = (response) => {
    try {
      this.data = new ChartModel(response.data[0]);
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
