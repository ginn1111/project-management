import { privateRequest } from '../axios';

const PREFIX_URL = '/project';

export const getList = (searchParams: string) =>
  privateRequest.get(`${PREFIX_URL}?${searchParams}`);

export const getListByDepartment = (idDepartment: string) => privateRequest.get(`${PREFIX_URL}/${idDepartment}/department`)

export const add = (payload: IProject) => privateRequest.post(`${PREFIX_URL}/add`, payload)

export const update = ({id, ...payload}: IProject) => privateRequest.patch(`${PREFIX_URL}/${id}/update`, payload)
