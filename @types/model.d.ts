interface IReport {
	id: string;
	content: string;
	createdDate: string;
	idEmpProject: string;
	empProject?: IEmployeeProject;
}

interface IRole {
	id: string;
	idDepartmentEmp: string;
	idQualification: string;
	roleName: string;
	startDate: string;
	endDate: any;
	note: string;
	departmentOfEmp: IEmployeesOfDepartment;
}
interface IWorkEvaluation {
	id: string;
	idEvaluation: string;
	idWorkOfProject: string;
	date: string;
	note: OrNull<string>;
	rankWorkEvaluation: IRankEvaluationWork;
	workOfProject: IWorkProject;
}
interface IRankEvaluationWork {
	id: string;
	name: string;
	note: OrNull<string>;
}
interface IWorkOfPermission {
	id: string;
	idEmpProject: string;
	idPermission: string;
	idWorkProject: string;
	note: any;
}

interface IWorkPermission {
	id: string;
	name: string;
	note: OrNull<string>;
	code: string;
}
interface IManageProject {
	id: string;
	idProject: string;
	idEmpHead: string;
	endDate: any;
	startDate: string;
	isHead: boolean;
	employee?: IEmployee;
}
interface IHistory {
	id: string;
	idEmployee: string;
	createdDate: string;
	content: string;
	note: string;
}
interface IResourcesPropose {
	id: string;
	idResource: string;
	idProposeResource: string;
	amount: number;
	resource: IResource;
}

interface IReviewProposeResource {
	id: string;
	idProposeResource: string;
	idState: string;
	createdDate: string;
	reviewingDate: OrNull<string>;
	note: OrNull<string>;
	state: IStatePropose;
	proposeResource: IProposeResource;
}

interface IProposeResource {
	id: string;
	idEmpProject: string;
	description: OrNull<string>;
	employeesOfProject?: EmployeesOfProject;
	resourcesProposes: IResourcesPropose[];
	manageProjects?: IP;
}
interface IResourceProject {
	id: string;
	idProject: string;
	idResource: string;
	amount: number;
	note: OrNull<string>;
	resource: IResource;
	name?: string;
	resourceOfTasks?: IResourceOfTask[];
}

interface IEmployeeProject {
	id: string;
	idHead: any;
	idProject: string;
	idProposeProject: string;
	startDate: string;
	endDate: string;
	note: any;
	proposeProject: IProposeProject;
}
interface ITask {
	id: string;
	name: string;
	note: OrNull<string>;
	isActive: boolean;
	resourceOfTasks?: IResourceOfTask[];
}

interface IResourceOfTask {
	id: string;
	idResource: string;
	idTask: string;
	amount: number;
	note: any;
	resource?: IResourceProject;
}

interface ITaskOfWork {
	id: string;
	idTask: string;
	idEmployee: string;
	startDate: string;
	percentOfDone: number;
	finishDateET: OrNull<string>;
	finishDateETWork: OrNull<string>;
	finishDate: OrNull<string>;
	startDateWork?: string;
	note: OrNull<string>;
	task: ITask;
}
interface IWorksEmployee {
	id: string;
	idEmployee: string;
	idWorksProject: string;
	note: OrNull<string>;
	tasksOfWork: ITaskOfWork[];
	employee?: IEmployeeProject;
	worksOfProject?: IWorkProject;
}

interface IWorkProject {
	id: string;
	idProject: string;
	idWork: string;
	startDate: string;
	finishDate: OrNull<string>;
	finishDateET: OrNull<string>;
	finishDateETProject?: OrNull<string>;
	finishDateETWork?: string;
	startDateWork?: string;
	note: OrNull<string>;
	worksOfEmployee: IWorksEmployee[];
	work?: IWork;
	workEvaluation?: IWorkEvaluation[];
}
interface IWork {
	id: string;
	name: string;
	note: OrNull<string>;
}

interface IResource {
	id: string;
	idResourceType: string;
	name: string;
	amount: number;
	note: any;
	resourceType?: IResourceType;
}

interface IResourceType {
	id: string;
	name: string;
	note: any;
}

interface IReviewingProposeProject {
	id: string;
	idProposeProject: string;
	idState: string;
	reviewingDate: string;
	note: string;
	statePropose: IStatePropose;
	proposeProject: IProposeProject;
	employeesOfDepartment: IEmployeesOfDepartment;
}
interface IStatePropose {
	id: string;
	name: string;
	note: string;
}

interface IProposeProject {
	id: string;
	idProject: string;
	idDeEmp: string;
	createdDate: string;
	content: string;
	project?: Project;
	employeesOfDepartment?: IEmployeesOfDepartment;
}

interface IDepartmentProject {
	id: string;
	idProject: string;
	idDepartment: string;
	createdDate: string;
	endDate: OrNull<string>;
	note: OrNull<string>;
	department?: IDepartment;
}

interface IProject {
	id: string;
	name: string;
	createdDate: string;
	startDate: string;
	finishDateET: string;
	finishDate: any;
	note: string;
	isSingle: OrNull<boolean>;
	departments?: IDepartmentProject[];
	manageProjects?: IManageProject[];
	worksOfProject?: IWorkProject[];
	projectResources?: IResourceProject[];
}

interface IWard {
	id: string;
	code: number;
	name: string;
	idDistrict: string;
}

interface IDistrict {
	id: string;
	idProvince: string;
	code: number;
	name: string;
}

interface IProvince {
	id: string;
	code: number;
	name: string;
}

interface IRole {
	id: string;
	idDepartmentEmp: string;
	idQualification: string;
	roleName: string;
	startDate: string;
	endDate: string;
	note: string;
}

interface IAccount {
	username: string;
	isActive: boolean;
	note: string;
	idEmployee?: string;
	employee?: IEmployee;
}

interface IPositionsEmployee {
	id: string;
	idEmployee: string;
	idPosition: string;
	startDate: string;
	endDate: string;
	note: string;
	position?: IPosition;
}

interface IPosition {
	id: string;
	name: string;
	note: string;
	isActive: boolean;
	code?: string;
}

interface IDepartment {
	id: string;
	name: string;
	phone: string;
	note: string;
	isActive: boolean;
	employeesOfDepartment?: IEmployeesOfDepartment[];
}

interface IEmployeesOfDepartment {
	id: string;
	idEmployee: string;
	idDepartment: string;
	startDate: string;
	endDate: string;
	note: any;
	department?: Department;
	employee?: IEmployee;
	roleOfEmployees?: IRole[];
}

interface IQualificationEmployee {
	id: string;
	idQualification: string;
	idEmployee: string;
	date: string;
	note: string;
	qualification: Qualification;
}

interface IQualification {
	id: string;
	name: string;
	url: any;
}

interface ICertsEmployee {
	id: string;
	idEmployee: string;
	idCertification: string;
	date: string;
	expiredDate: string;
	note: string;
	certification: ICertification;
}

interface ICertification {
	id: string;
	name: string;
	url: any;
}

interface IEmployee {
	info?: IEmployee;
	id: string;
	idWard: OrNull<string>;
	idProvince: OrNull<string>;
	idDistrict: OrNull<string>;
	identifyNumber: OrNull<string>;
	fullName: string;
	address: string;
	phone: string;
	birthday: any;
	note: any;
	gender: string;
	email: string;
	isActive: boolean;
	ward: IWard;
	district: IDistrict;
	province: IProvince;
	certificates?: ICertsEmployee[];
	qualifications?: IQualificationEmployee[];
	departments?: IEmployeesOfDepartment[];
	positions?: IPositionsEmployee[];
	account?: account;
	accessToken?: string;
	role?: string;
	roles?: IRole[];
}

interface IProvince {
	code: number;
	name: string;
	id: string;
}

interface IDistrict {
	code: number;
	name: string;
	id: string;
	province?: IProvince;
}

interface IWard {
	district?: IDistrict;
	code: number;
	name: string;
	id: string;
}
