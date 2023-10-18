import { privateRequest } from '../axios';

export const create = (employee: Partial<IEmployee>) =>
  privateRequest.post('/employee/add', {
    ...employee,
  });

export const getList = (searchParams: string) => {
  return privateRequest.get(`/employee?${searchParams}`);
};
