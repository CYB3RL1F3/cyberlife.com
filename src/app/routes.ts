import * as React from 'react';
import { Events, Charts, Releases, Contact } from 'app/containers';
import { Podcasts } from 'app/containers/Podcasts';
import { EventDetails } from 'app/containers/EventDetails/EventDetails';
console.log(Podcasts);

export interface RouteType {
  component: React.ComponentType<any>;
  path: string;
  label: string;
  key: string;
  menu: boolean;
}

export const routes: RouteType[] = [
  {
    component: Podcasts,
    path: '/',
    label: 'Podcasts',
    key: 'podcasts',
    menu: true
  },
  {
    component: Events,
    path: '/events',
    label: 'Gigs',
    key: 'gigs',
    menu: true
  },
  {
    component: Releases,
    path: '/releases',
    label: 'Releases',
    key: 'releases',
    menu: true
  },
  {
    component: Charts,
    path: '/charts',
    label: 'Charts',
    key: 'charts',
    menu: true
  },
  {
    component: Contact,
    path: '/contact',
    label: 'Contact',
    key: 'contact',
    menu: true
  },
  {
    component: EventDetails,
    path: '/events/:id',
    label: '',
    key: 'event',
    menu: false
  },
  {
    component: EventDetails,
    path: '/events/:type/:id',
    label: '',
    key: 'eventTyped',
    menu: false
  }
];

export default routes;
