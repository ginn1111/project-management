import { privateRequest } from '../axios';

export const create = (employee: Partial<IEmployee>) =>
  privateRequest.post('/employee/add', {
    ...employee,
  });

export const getList = (searchParams: string) => {
  return privateRequest.get(`/employee?${searchParams}`);
};

export const update = ({ id, ...rest }: Partial<IEmployee>) =>
  privateRequest.patch(`/employee/${id}/update`, { ...rest });

export const remove = (id: string) =>
  privateRequest.delete(`/employee/${id}/remove`);

export const getDetail = (id: string) => privateRequest.get(`/employee/${id}`);
