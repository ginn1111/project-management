import { privateRequest } from '../axios';

const PREFIX_URL = '/project/work';

export const getList = ({ idProject }: { idProject: string }) =>
  privateRequest.get(`${PREFIX_URL}/${idProject}`);

export const add = ({ idProject, ...payload }: Partial<IWorkProject>) =>
  privateRequest.post(`${PREFIX_URL}/${idProject}/create`, payload);
