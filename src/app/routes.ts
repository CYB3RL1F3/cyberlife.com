import * as React from 'react';
/*
import {
  Bio,
  Podcasts,
  Events,
  Charts,
  Releases,
  Contact,
  EventDetails,
  PodcastDetails
} from 'app/containers';
*/

import { Bio } from 'app/containers/Bio';
import { Podcasts } from 'app/containers/Podcasts';
import { Events } from 'app/containers/Events';
import { Charts } from 'app/containers/Charts/Charts';
import { Releases } from 'app/containers/Releases';
import { Contact } from 'app/containers/Contact';
import { EventDetails } from 'app/containers/EventDetails';
import { PodcastDetails } from 'app/containers/PodcastDetails';

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
  },
  {
    component: PodcastDetails,
    path: '/podcasts/:id',
    label: '',
    key: 'podcast',
    menu: false
  },
  {
    component: Bio,
    path: '/biography',
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
