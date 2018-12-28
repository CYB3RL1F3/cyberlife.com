import axios, { AxiosPromise } from 'axios';

const ID = '045af2a3';

const instance = axios.create({
  // baseURL: `https://profilart.herokuapp.com/`,
  baseURL: 'http://localhost:8888/',
  timeout: 10000
});

console.log(instance);

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
export const getChart = (): AxiosPromise => fetch('charts');
export const getInfos = (): AxiosPromise => fetch('infos');
export const getReleases = (): AxiosPromise => fetch('releases');

export const sendMail = ({ name, email, subject, message }): AxiosPromise =>
  post('contact', { name, email, subject, message });
