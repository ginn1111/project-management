import { privateRequest } from '../axios';

export const getResourceTypeList = () =>
  privateRequest.get('/utils/resource-type');
