import { publicRequest } from '../axios';

export const getProvinces = () => publicRequest.get('/utils/provinces');
export const getDistricts = (id: string) =>
  publicRequest.get(`/utils/districts/${id}`);
export const getWards = (id: string) => publicRequest.get(`/utils/wards/${id}`);
