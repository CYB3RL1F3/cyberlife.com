import { useContext, Context } from "react";
import { MobXProviderContext } from 'mobx-react'
import { Stores } from 'app/constants/stores';
import { EventsStore, RouterStore, ChartStore, ReleasesStore, PlayerStore, AppStore, InfosStore, PodcastStore, SelectedReleaseStore, SelectedPodcastStore, SelectedEventStore, IStores } from "app/stores";
export const useStores = (): Context<Record<string, IStores>> => useContext<any>(MobXProviderContext);

export const useStore = <T>(storeName: Stores): T => {
  const stores = useStores();
  return stores[storeName];
}

export const useRouterStore = () => useStore<RouterStore>(Stores.router);
export const useChartStore = () => useStore<ChartStore>(Stores.chart);
export const useAppStore = () => useStore<AppStore>(Stores.app);
export const usePastEventStore = () => useStore<EventsStore>(Stores.past_events);
export const useForthcomingEventStore = () => useStore<EventsStore>(Stores.forthcoming_events);
export const useInfosStore = () => useStore<InfosStore>(Stores.infos);
export const usePodcastStore = () => useStore<PodcastStore>(Stores.podcasts);
export const useReleaseStore = () => useStore<ReleasesStore>(Stores.releases);
export const usePlayerStore = () => useStore<PlayerStore>(Stores.player);
export const useSelectedReleaseStore = () => useStore<SelectedReleaseStore>(Stores.selected_release);
export const useSelectedPodcastStore = () => useStore<SelectedPodcastStore>(Stores.selected_podcast);
export const useSelectedEventStore = () => useStore<SelectedEventStore>(Stores.selected_event);
