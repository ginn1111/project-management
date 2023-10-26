import { publicRequest } from '../axios';

const PREFIX_URL = '/authentication';

export const login = (credentials: { username: string; password: string }) =>
  publicRequest.post(`${PREFIX_URL}/login`, credentials);
