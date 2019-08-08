import axios, { AxiosPromise } from 'axios';

const ID = '045af2a3';

const instance = axios.create({
  baseURL: 'https://profilart.fr/',
  // baseURL: `http://localhost:8888/`,
  timeout: 10000
});

export const getFinalEndPoint = (endpoint: string): string =>
  `${ID}/${endpoint}`;

export const fetch = (endpoint: string, params = {}): AxiosPromise =>
  instance.get(getFinalEndPoint(endpoint), { params });

export const post = (endpoint: string, params = {}): AxiosPromise =>
  instance.post(getFinalEndPoint(endpoint), {
    params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export const getEvents = (type: number): AxiosPromise =>
  fetch('events', { type });

export const getEventById = (
  ID: number | string,
  type: number | string
): AxiosPromise =>
  parseInt(ID as string, 10).toString() === ID
    ? fetch('event', { ID, type })
    : fetch('event', { name: encodeURIComponent(ID as string), type });

export const getCharts = (): AxiosPromise => fetch('charts');
export const getInfos = (): AxiosPromise => fetch('infos');
export const getReleases = (): AxiosPromise => fetch('releases');
export const getPodcasts = (): AxiosPromise =>
  fetch('playlist', { name: 'dj-sets' });
export const getPodcastById = (id: number): AxiosPromise =>
  fetch('track', { id });

export const sendMail = ({ name, email, subject, message }): AxiosPromise =>
  post('contact', { name, email, subject, message });
