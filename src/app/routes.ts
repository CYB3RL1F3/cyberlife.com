import * as React from 'react';
import { Events, Charts, Releases, Contact } from 'app/containers';

export interface RouteType {
  component: React.ComponentType<any>;
  path: string;
  label: string;
  key: string;
}

export const routes: RouteType[] = [
  {
    component: Events,
    path: '/',
    label: 'Gigs',
    key: 'gigs'
  },
  {
    component: Releases,
    path: '/releases',
    label: 'Releases',
    key: 'releases'
  },
  {
    component: Charts,
    path: '/charts',
    label: 'Charts',
    key: 'charts'
  },
  {
    component: Contact,
    path: '/contact',
    label: 'Contact',
    key: 'contact'
  }
];

export default routes;
