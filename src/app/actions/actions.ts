import axios, { AxiosPromise } from 'axios';
import config from 'app/config';

const instance = axios.create({
  baseURL: config.api,
  timeout: 20000
});

export const fetch = (endpoint: string, params = {}): AxiosPromise =>
  instance.get(endpoint, { params });

export const post = (endpoint: string, params = {}): AxiosPromise =>
  instance.post(endpoint, {
    params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export const getEvents = (type: number): AxiosPromise =>
  fetch('events', { type });

export const getEventById = (
  eventId: number | string,
  type: number | string
): AxiosPromise =>
  parseInt(eventId as string, 10).toString() === eventId
    ? fetch('event', { eventId, type })
    : fetch('event', { name: encodeURIComponent(eventId as string), type });

export const getCharts = (): AxiosPromise => fetch('charts');
export const getInfos = (): AxiosPromise => fetch('infos');
export const getReleases = (): AxiosPromise => fetch('releases');
export const getPosts = (): AxiosPromise => fetch('posts');
export const getPodcasts = (): AxiosPromise =>
  fetch('playlist', { name: 'dj-sets' });
export const getPodcastById = (id: number): AxiosPromise =>
  fetch('track', { id });
export const getReleaseById = (id: number): AxiosPromise =>
  fetch('release', {
    id
  });

export const sendMail = ({ name, email, subject, message }): AxiosPromise =>
  post('contact', { name, email, subject, message });
