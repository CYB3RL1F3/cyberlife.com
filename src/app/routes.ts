import * as React from 'react';
import { Events, Charts, Releases, Contact } from 'app/containers';

export interface RouteType {
  component: React.ComponentType<any>;
  path: string;
  label: string;
  key: string;
  menu: boolean;
}

export const routes: RouteType[] = [
  {
    component: Events,
    path: '/',
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
  }
];

export default routes;
