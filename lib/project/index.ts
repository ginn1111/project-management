import { privateRequest } from '../axios';

const PREFIX_URL = '/project';

export const getList = (searchParams: string) =>
  privateRequest.get(`${PREFIX_URL}?${searchParams}`);
