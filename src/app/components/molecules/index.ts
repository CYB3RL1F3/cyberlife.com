import { lazy } from "react";

export * from './Nav';
export * from './EventItem';
export * from './ReleaseItem';
export * from './ChartItem';
export * from './Footer';
// export { default as PodcastItem } from './PodcastItem';
export const PodcastItem = lazy(() => import('./PodcastItem'));
export * from './MenuBtn';
export { default as MiniPlayer } from './MiniPlayer';
export { default as ReleasePlayer } from './ReleasePlayer';