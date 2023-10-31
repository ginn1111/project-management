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
}
interface IResourceProject {
	id: string;
	idProject: string;
	idResource: string;
	amount: number;
	note: OrNull<string>;
	resource: IResource;
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
}
interface ITaskOfWork {
	id: string;
	idTask: string;
	idEmployee: string;
	percentOfDone: number;
	finishDateET: OrNull<string>;
	finishDate: OrNull<string>;
	note: OrNull<string>;
	task: ITask;
}
interface IWorksEmployee {
	id: string;
	idEmployee: string;
	idWorksProject: string;
	note: OrNull<string>;
	tasksOfWork: ITaskOfWork[];
}

interface IWorkProject {
	id: string;
	idProject: string;
	idWork: string;
	startDate: string;
	finishDate: OrNull<string>;
	finishDateET: OrNull<string>;
	note: OrNull<string>;
	worksOfEmployee: IWorksEmployee[];
	work?: IWork;
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
	departments?: IDepartmentProject[];
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
	position?: Position;
}

interface IPosition {
	id: string;
	name: string;
	note: string;
	isActive: boolean;
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
}

interface IWard {
	code: number;
	name: string;
	id: string;
}
