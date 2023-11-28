import { QueryKeys } from '@/constants/query-key';
import { DepartmentServices, EmployeeProjectServices } from '@/lib';
import { AxiosResponse } from 'axios';
import { useParams } from 'next/navigation';
import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import ReactSelect from '../ui/react-select';
import MyLabel from '../ui/my-label';
import { get, isEmpty } from 'lodash';

interface IGroupSelectNhanVien {
	isMulti?: boolean;
	onWatch?: (...args: unknown[]) => void;
}

const GroupSelectNhanVien = forwardRef(
	({ isMulti = false, onWatch }: IGroupSelectNhanVien, ref) => {
		const params = useParams();
		const form = useForm();

		useEffect(() => {
			const subscription = form.watch((data, { name }) => {
				onWatch?.(name, data);
			});

			return () => subscription.unsubscribe();
		}, []);

		useImperativeHandle(ref, () => form);

		const { data: departmentData } = useQuery<
			AxiosResponse<{ departments: IDepartment[] }>
		>({
			queryKey: QueryKeys.getDepartment(params.id as string),
			queryFn: ({ queryKey }) =>
				DepartmentServices.getList(`idProject=${queryKey[1]}`),
			enabled: !!params.id,
		});

		const { data: employeeData } = useQuery<
			AxiosResponse<{ employeesOfProject: IEmployeeProject[] }>
		>({
			queryKey: QueryKeys.getEmployeeByDepartmentAndProject(
				params.id as string,
				form.getValues('departmentId')
			),
			queryFn: ({ queryKey }) =>
				EmployeeProjectServices.getList({
					idProject: queryKey[1] as string,
					searchParams: `idDepartment=${queryKey[2]}`,
				}),
			enabled: !!params.id && !!form.watch('departmentId'),
		});

		const rolesOfEmp = useMemo(() => {
			if (!form.watch('idEmployee')) return;

			return employeeData?.data?.employeesOfProject?.find(
				(employee) => employee.id === form.watch('idEmployee')
			)?.proposeProject?.employeesOfDepartment?.roleOfEmployees;
		}, [form.watch('idEmployee')]);

		useEffect(() => {
			const sub = form.watch((_, { name }) => {
				if (name === 'departmentId') {
					form.setValue('idEmployeePj', null);
				}
			});

			return () => sub.unsubscribe();
		}, []);

		return (
			<>
				<div className="custom-select flex items-center gap-4">
					<ReactSelect
						control={form.control}
						name="departmentId"
						labelProps={{ required: true }}
						containerClass="flex-1"
						title="Phòng ban"
						placeholder="phòng ban"
						options={
							departmentData?.data.departments.map(({ id, name }) => ({
								label: name,
								value: id,
							})) ?? []
						}
					/>
				</div>

				<div className="custom-select">
					<ReactSelect
						control={form.control}
						name="idEmployee"
						labelProps={{ required: true }}
						title="Nhân viên"
						placeholder="nhân viên"
						isMulti={isMulti}
						options={
							employeeData?.data.employeesOfProject.map(
								({ id, proposeProject: { employeesOfDepartment } }) => ({
									value: id,
									label: employeesOfDepartment?.employee?.fullName ?? '',
								})
							) ?? []
						}
					/>
				</div>

				{rolesOfEmp?.length ? (
					<div>
						<MyLabel required>Chuyên môn</MyLabel>
						<p className="font-md text-sm">
							[{rolesOfEmp?.map((role: IRole) => role.roleName).join(', ')}]
						</p>
					</div>
				) : (
					<>
						{form.watch('idEmployee') ? (
							<p className="text-danger font-bold text-center text-sm">
								Chưa có chuyên môn
							</p>
						) : null}
					</>
				)}
			</>
		);
	}
);

GroupSelectNhanVien.displayName = 'GroupSelectNhanVien';

export default GroupSelectNhanVien;
