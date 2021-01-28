import { observable, action, makeObservable } from 'mobx';
import { ChartModel } from 'app/models';
import { getCharts } from 'app/actions';
import { InitializableStore } from './stores';
import { captureException } from '@sentry/browser';

export class ChartStore implements InitializableStore {

  public loading: boolean = false;
  public error: string = null;
  public data: ChartModel = null;
  
  constructor() {
    makeObservable(this, {
      loading: observable,
      data: observable,
      error: observable,
      init: action,
      loadCharts: action,
      onChartsLoaded: action.bound,
      onChartsFailed: action.bound
    });
  }

  init = () => !this.data && this.loadCharts();

  loadCharts = () => {
    this.loading = true;
    this.error = null;
    getCharts()
      .then(this.onChartsLoaded)
      .catch(this.onChartsFailed);
  };

  onChartsLoaded = (response) => {
    try {
      this.data = new ChartModel(response.data[0]);
      this.loading = false;
    } catch (e) {
      this.onChartsFailed(e);
    }
  };

  onChartsFailed = (e) => {
    captureException(e);
    this.error = e.toString();
    this.loading = false;
  };
}

export default ChartStore;
