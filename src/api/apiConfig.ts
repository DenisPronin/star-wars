import axios, { AxiosInstance } from 'axios';

const queryInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

queryInstance.interceptors.response.use(
  (response) => response.data,
);

export function queryGet(url: string, config = {}) {
  return queryInstance.get(url, config);
}
