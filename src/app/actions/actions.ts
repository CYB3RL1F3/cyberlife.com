import axios, { AxiosPromise } from 'axios';

const ID = '045af2a3';

const instance = axios.create({
  baseURL: `https://profilart.herokuapp.com/`,
  timeout: 10000
});

export const getFinalEndPoint = (endpoint: string): string =>
  `${ID}/${endpoint}`;

export const fetch = (endpoint: string, params = {}): AxiosPromise =>
  instance.get(getFinalEndPoint(endpoint), { params });

export const getEvents = (type: number): AxiosPromise =>
  fetch('events', { type });
export const getChart = (): AxiosPromise => fetch('charts');
export const getInfos = (): AxiosPromise => fetch('infos');
export const getReleases = (): AxiosPromise => fetch('releases');

export const sendMail = ({ name, email, subject, message }): AxiosPromise =>
  instance.post(getFinalEndPoint('contact'), {
    params: { name, email, subject, message }
  });
