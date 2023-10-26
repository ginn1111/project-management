import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
});

export const initialPrivateRequest = (accessToken: string) => {
  privateRequest.interceptors.request.clear();
  privateRequest.interceptors.request.use((config) => {
    console.log(config.headers, accessToken);
    config.headers['x-authorization'] = `Bearer ${accessToken}`;

    return config;
  });
};
