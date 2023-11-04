export const QueryKeys = {
	getResourceType: (...keys: string[]) => ['get-resource-type', ...keys],
	getResource: (...keys: string[]) => ['get-resource', ...keys],
	getDepartment: (...keys: string[]) => ['get-department', ...keys],
	getEmployeeProject: (...keys: string[]) => ['get-employee-project', ...keys],
	getWorkHistory: (...keys: string[]) => ['get-work-history', ...keys],
	getDetailProject: (...keys: string[]) => ['get-detail-project', ...keys],
};
