export const QueryKeys = {
	getRankEvaluationWork: (...keys: string[]) => [
		'get-rank-evaluation-work',
		...keys,
	],
	getResourceType: (...keys: string[]) => ['get-resource-type', ...keys],
	getResource: (...keys: string[]) => ['get-resource', ...keys],
	getDepartment: (...keys: string[]) => ['get-department', ...keys],
	getEmployeeProject: (...keys: string[]) => ['get-employee-project', ...keys],
	getWorkHistory: (...keys: string[]) => ['get-work-history', ...keys],
	getDetailProject: (...keys: string[]) => ['get-detail-project', ...keys],
	getEmployee: (...keys: string[]) => ['get-employee', ...keys],
	isInProject: (...keys: string[]) => ['is-in-project', ...keys],
	getManageProject: (...keys: string[]) => ['get-project', ...keys],
	getPermissionsOfWork: (...keys: string[]) => [
		'get-permission-of-work',
		...keys,
	],
	getPermissionsOfWorkOfEmp: (...keys: string[]) => [
		'get-permission-of-work-of-emp',
		...keys,
	],
};
