import { QueryKeys } from '@/constants/query-key';
import { DepartmentServices, EmployeeProjectServices } from '@/lib';
import { AxiosResponse } from 'axios';
import { useParams } from 'next/navigation';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import ReactSelect from '../ui/react-select';

interface IGroupSelectNhanVien {
	isMulti?: boolean;
	onWatch: (...args: unknown[]) => void;
}

const GroupSelectNhanVien = forwardRef(
	({ isMulti = false, onWatch }: IGroupSelectNhanVien, ref) => {
		const params = useParams();
		const form = useForm();

		useEffect(() => {
			const subscription = form.watch((data, { name }) => {
				onWatch(name, data);
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
			queryKey: QueryKeys.getDepartment(
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
					{/* <ReactSelect
					title="Chuyên môn"
					placeholder="chuyên môn"
					containerClass="flex-1"
					options={[
						{
							value: 'Test1',
							label: 'Test label1',
						},
						{
							value: 'Test2',
							label: 'Test label2',
						},
						{
							value: 'Test3',
							label: 'Test label3',
						},
						{
							value: 'Test4',
							label: 'Test label4',
						},
					]}
				/> */}
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
			</>
		);
	}
);

GroupSelectNhanVien.displayName = 'GroupSelectNhanVien';

export default GroupSelectNhanVien;
