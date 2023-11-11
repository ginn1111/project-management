import { privateRequest } from '../axios';

export const getWorkPermission = () =>
	privateRequest.get('/utils/permission/work');
