import { privateRequest } from '../axios';

const PREFIX_URL = '/project';

export const getList = (searchParams: string, accessToken?: string) => {
	return privateRequest.get(`${PREFIX_URL}?${searchParams}`, {
		headers: {
			['x-authorization']: `Bearer ${accessToken}`,
		},
	});
};

export const getDetail = (idProject: string, accessToken?: string) =>
	privateRequest.get(`${PREFIX_URL}/${idProject}`, {
		headers: {
			['x-authorization']: `Bearer ${accessToken}`,
		},
	});

export const getListByDepartment = (idDepartment: string) =>
	privateRequest.get(`${PREFIX_URL}/${idDepartment}/department`);

export const add = (payload: IProject) =>
	privateRequest.post(`${PREFIX_URL}/add`, payload);

export const update = ({ id, ...payload }: IProject) =>
	privateRequest.patch(`${PREFIX_URL}/${id}/update`, payload);

export const addResource = ({
	id,
	resource,
}: {
	id: string;
	resource: { id: string; amount: number }[];
}) => privateRequest.post(`${PREFIX_URL}/${id}/add-resource`, { resource });

export const proposeProject = (payload: {
	idEmployee: string;
	idProject: string;
	content: string;
}) => privateRequest.post(`${PREFIX_URL}/propose`, payload);

export const inProject = (idProject: string, accessToken?: string) =>
	privateRequest.get(`${PREFIX_URL}/${idProject}/in-project`, {
		headers: {
			['x-authorization']: `Bearer ${accessToken}`,
		},
	});

export const doneProject = (idProject: string) =>
	privateRequest.post(`${PREFIX_URL}/${idProject}/done`);

export const getManageOfProject = (idProject: string) =>
	privateRequest.get(`${PREFIX_URL}/authorization/${idProject}/permission`);

export const addManageProject = ({
	idProject,
	manageProject,
}: {
	idProject: string;
	manageProject: { id: string; isAdd: boolean }[];
}) =>
	privateRequest.post(`${PREFIX_URL}/authorization/${idProject}/add-manage`, {
		manageProject,
	});

export const addEmployees = ({
	idProject,
	employees,
}: {
	idProject: string;
	employees: string[];
}) =>
	privateRequest.post(`${PREFIX_URL}/${idProject}/add/employees`, {
		employees,
	});

export const getReport = (
	idProject: string,
	searchParams: string,
	accessToken?: string
) =>
	privateRequest.get(`${PREFIX_URL}/report/${idProject}?${searchParams}`, {
		headers: {
			['x-authorization']: `Bearer ${accessToken}`,
		},
	});

export const createReport = ({
	idProject,
	content,
}: {
	content: string;
	idProject: string;
}) => privateRequest.post(`${PREFIX_URL}/report/${idProject}/add`, { content });

export const cancelProject = (idProject: string) =>
	privateRequest.put(`${PREFIX_URL}/${idProject}/cancel`);
