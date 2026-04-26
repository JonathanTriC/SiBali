import { BASE_URL } from '@constants/url';
import { handlerGetItem, Keys } from '@constants';
import axios, { CreateAxiosDefaults } from 'axios';

const baseConfig: CreateAxiosDefaults<any> = {
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
  },
  /* other custom settings */
  timeout: 10000,
};

const client = axios.create(baseConfig);
client.interceptors.request.use(async function (config) {
  if (!config.headers.Authorization) {
    const token = handlerGetItem(Keys.accessToken);

    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
  }

  return config;
});
client.interceptors.response.use(
  async function (response) {
    // dismissLoading();
    return Promise.resolve(response);
  },
  async function (error) {
    return Promise.reject(error);
  },
);

export { client };
