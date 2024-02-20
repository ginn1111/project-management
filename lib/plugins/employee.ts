import { AxiosResponse } from 'axios';
import { publicRequest } from '../axios';

const BASE_PATH = '/plugins';

export const getListEmp = (
	queryString?: string
): Promise<AxiosResponse<IEmployee[]>> =>
	publicRequest.get(`${BASE_PATH}/list-emp?${queryString}`, {
		headers: {
			['x-api-key']: process.env.XAPI,
		},
	});
