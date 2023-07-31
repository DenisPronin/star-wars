import axios, { AxiosInstance } from 'axios';

export const apiUrl = 'https://swapi.dev/api';

const queryInstance: AxiosInstance = axios.create({
  baseURL: apiUrl,
});

queryInstance.interceptors.response.use(
  (response) => response.data,
);

export function queryGet(url: string, config = {}) {
  return queryInstance.get(url, config);
}
