export interface InitializableStore {
  loading: boolean;
  data: any;
  error: string;
  init: () => void;
}
