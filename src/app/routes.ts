import { lazy, ComponentType } from 'react';
import { paths } from './paths';

const BioPromise = import('app/containers/Bio');
const Bio = lazy(() => BioPromise);

const PodcastsPromise = import('app/containers/Podcasts');
const Podcasts = lazy(() => PodcastsPromise);

const EventsPromise = import('app/containers/Events');
const Events = lazy(() => EventsPromise);

const ChartsPromise = import('app/containers/Charts');
const Charts = lazy(() => ChartsPromise);

const ReleasesPromise = import('app/containers/Releases');
const Releases = lazy(() => ReleasesPromise);

const ContactPromise = import('app/containers/Contact');
const Contact = lazy(() => ContactPromise);


const EventDetailsPromise = import('app/containers/EventDetails');
const EventDetails = lazy(() => EventDetailsPromise);

const PodcastDetailsPromise = import('app/containers/PodcastDetails');
const PodcastDetails = lazy(() => PodcastDetailsPromise);

const ReleaseDetailsPromise = import('app/containers/ReleaseDetails');
const ReleaseDetails = lazy(() => ReleaseDetailsPromise);

export interface RouteType {
  component: ComponentType<any>;
  path: string;
  label: string;
  key: string;
  menu: boolean;
}

export const routes: RouteType[] = [
  {
    component: Podcasts,
    path: paths.podcasts,
    label: 'Podcasts',
    key: 'podcasts',
    menu: true
  },
  {
    component: Events,
    path: paths.events,
    label: 'Gigs',
    key: 'gigs',
    menu: true
  },
  {
    component: Releases,
    path: paths.releases,
    label: 'Releases',
    key: 'releases',
    menu: true
  },
  {
    component: Charts,
    path: paths.charts,
    label: 'Charts',
    key: 'charts',
    menu: true
  },
  {
    component: Contact,
    path: paths.contact,
    label: 'Contact',
    key: 'contact',
    menu: true
  },
  {
    component: EventDetails,
    path: paths.eventDetailsDefault,
    label: '',
    key: 'event',
    menu: false
  },
  {
    component: EventDetails,
    path: paths.eventDetails,
    label: '',
    key: 'eventTyped',
    menu: false
  },
  {
    component: PodcastDetails,
    path: paths.podcastDetails,
    label: '',
    key: 'podcast',
    menu: false
  },
  {
    component: ReleaseDetails,
    path: paths.releaseDetails,
    label: '',
    key: 'release',
    menu: false
  },
  {
    component: Bio,
    path: paths.bio,
    label: 'Biography',
    key: 'bio',
    menu: false
  }
];

export const replaceId = (path: string, id: string | number) =>
  path.replace(':id', id ? id.toString() : '');

export const getRouteByKey = (key: string) =>
  routes.find((route) => route.key === key);

export const getPath = (key: string, id?: string | number) => {
  const route = getRouteByKey(key);
  return id ? replaceId(route.path, id) : route.path;
};

export default routes;
