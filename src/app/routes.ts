import { paths } from './paths';
export interface RouteType {
  component: string;
  path: string;
  label: string;
  key: string;
  menu: boolean;
}

export const routes: RouteType[] = [
  {
    component: 'Podcasts',
    path: paths.podcasts,
    label: 'Podcasts',
    key: 'podcasts',
    menu: true
  },
  {
    component: 'Events',
    path: paths.events,
    label: 'Gigs',
    key: 'gigs',
    menu: true
  },
  {
    component: 'Releases',
    path: paths.releases,
    label: 'Releases',
    key: 'releases',
    menu: true
  },
  {
    component: 'Charts',
    path: paths.charts,
    label: 'Charts',
    key: 'charts',
    menu: true
  },
  {
    component: 'Contact',
    path: paths.contact,
    label: 'Contact',
    key: 'contact',
    menu: true
  },
  {
    component: 'EventDetails',
    path: paths.eventDetailsDefault,
    label: '',
    key: 'event',
    menu: false
  },
  {
    component: 'EventDetails',
    path: paths.eventDetails,
    label: '',
    key: 'eventTyped',
    menu: false
  },
  {
    component: 'PodcastDetails',
    path: paths.podcastDetails,
    label: '',
    key: 'podcast',
    menu: false
  },
  {
    component: 'ReleaseDetails',
    path: paths.releaseDetails,
    label: '',
    key: 'release',
    menu: false
  },
  {
    component: 'Bio',
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
