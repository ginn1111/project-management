import { Dayjs, OpUnitType } from 'dayjs';
import { get, isNil } from 'lodash';

export const IS_BROWSER = typeof window !== 'undefined';

export function datetimeLocal(datetime: string) {
	if (!datetime) return;
	const dt = new Date(datetime);
	dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
	return dt.toISOString().slice(0, 16);
}

export const now = new Date();

export const getMonth = (dt: Date, add: number = 0) => {
	let month = dt.getMonth() + 1 + add;
	const str = (month < 10 ? '0' + month : month).toString();
	return str;
};

export const getFromLocal = (key: string) => {
	if (IS_BROWSER) {
		try {
			return JSON.parse(localStorage.getItem(key) ?? '""');
		} catch (error) {
			console.log('error from getFromLocal', error);
			return '';
		}
	}
	return '';
};

export const setToLocal = (key: string, value: any) => {
	if (IS_BROWSER) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.log('error from setToLocal', error);
		}
	}
};

export const removeFromLocal = (key: string) => {
	if (IS_BROWSER) {
		localStorage.removeItem(key);
	}
};

export const clearLocal = (callback?: () => void) => {
	if (IS_BROWSER) {
		localStorage.clear();
		callback?.();
	}
};

export const getValueFromId = <T extends { name: string; id: string }>(
	idProject: string,
	dataList: T[]
) => {
	const dfValue = dataList.find(({ id }) => id === idProject);

	return dfValue ? { label: dfValue.name, value: dfValue.id } : null;
};

export const getEmployeeFromProposePj = (proposeProject?: IProposeProject) =>
	get(proposeProject, 'employeesOfDepartment.employee') as IEmployee;

export const betweenTime = (
	time: Dayjs,
	timeRange: [Dayjs, Dayjs],
	unit: OpUnitType = 'd',
	type = 'dự án'
) => {
	const isValid = time.isValid() && timeRange.every((day) => day.isValid());
	if (!isValid) return 'Ngày không hợp lệ';
	if (time.isBefore(timeRange[0], unit) && !time.isSame(timeRange[0], 'd')) {
		return `Ngày bắt đầu không thể nhỏ hơn ngày bắt đầu ${type}!`;
	}
	if (time.isAfter(timeRange[1], unit) && !time.isSame(timeRange[1], 'd')) {
		return `Ngày hoàn thành dự kiến không thể quá ngày hoàn thành dự kiến ${type}!`;
	}
	return '';
};

export const hasTask = (worksOfEmployee: IWorksEmployee[]) => {
	const tasksOfWork = worksOfEmployee
		.flatMap((work) => work.tasksOfWork)
		.filter((task) => task.task.isActive);

	return tasksOfWork?.length > 0;
};

export const getTimeUnit = (secondTime: number) => {
	if (secondTime >= 365 * 30 * 24 * 3600) {
		return {
			type: 'years',
			unit: ' Năm',
		};
	}
	if (secondTime >= 30 * 24 * 3600) {
		return {
			type: 'months',
			unit: ' Tháng',
		};
	}
	if (secondTime >= 7 * 24 * 3600) {
		return {
			type: 'weeks',
			unit: ' Tuần',
		};
	}
	return {
		type: 'days',
		unit: ' Ngày',
	};
};

export const removeSign = (str?: string) =>
	str?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '');

export const formatPermission = (permission: Record<string, boolean>) => {
	return Object.entries(permission).reduce((acc, [id, isGrant]) => {
		if (!isNil(isGrant)) {
			acc.push({ id, isGrant });
		}
		return acc;
	}, [] as { id: string; isGrant: boolean }[]);
};
