import { privateRequest } from '../axios';

const PREFIX_URL = '/qualification';

export const create = (qualification: Partial<QualificationEmployee>) =>
  privateRequest.post(`${PREFIX_URL}/add`, {
    ...qualification,
  });

export const getList = (idEmp: string) => {
  return privateRequest.get(`${PREFIX_URL}/${idEmp}/employee`);
};

export const update = ({
  id,
  ...rest
}: Partial<QualificationEmployee & IQualification>) =>
  privateRequest.patch(`${PREFIX_URL}/${id}/update`, { ...rest });

export const getDetail = (id: string) =>
  privateRequest.get(`${PREFIX_URL}/${id}`);

export const addRole = ({
  idQualification,
  idEmp,
  ...rest
}: Partial<IRole & { idEmp: string }>) =>
  privateRequest.post(`${PREFIX_URL}/${idQualification}/role/${idEmp}`, {
    ...rest,
  });
