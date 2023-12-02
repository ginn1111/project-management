import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Modal, { IModalProps } from '@/components/ui/modal';
import Label from '@/components/ui/my-label';
import ReactSelect from '@/components/ui/react-select';
import { Textarea } from '@/components/ui/textarea';
import { Role } from '@/constants/general';
import { QueryKeys } from '@/constants/query-key';
import {
	CustomerServices,
	DepartmentServices,
	EmployeeServices,
	ProjectServices,
} from '@/lib';
import { ProjectSchema } from '@/yup-schema/project';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { identity, omit, pickBy } from 'lodash';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect, useMemo } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

interface IModalThemDuAn
	extends Omit<IModalProps<Partial<IProject>>, 'children'> {
	isEdit?: boolean;
}

const ModalThemDuAn = (props: IModalThemDuAn) => {
	const { isEdit = false, data, ...rest } = props;

	const { data: departmentData, isFetching } = useQuery<
		AxiosResponse<{ departments: IDepartment[]; totalItems: number }>
	>({
		queryKey: ['departments'],
		queryFn: () => DepartmentServices.getList(''),
		enabled: rest.open,
	});

	const { data: session } = useSession();
	const { user } = session ?? {};

	const isManage = user?.info?.role === Role.QUAN_LY_TRUONG_PHONG;
	const isSingleProject = data?.isSingle;

	const { data: employeeListData, isLoading: fetchingEmployees } = useQuery<
		AxiosResponse<{ employees: IEmployee[]; totalItems: number }>
	>({
		queryKey: QueryKeys.getEmployee(),
		queryFn: ({}) =>
			EmployeeServices.getList(`code=${Role.QUAN_LY_TRUONG_PHONG}`),
		enabled: rest.open,
	});

	const { data: customerData, isLoading: fetchingCustomers } = useQuery<
		AxiosResponse<{ customers: ICustomer[]; totalItems: number }>
	>({
		queryKey: QueryKeys.getCustomers(),
		queryFn: ({}) => CustomerServices.getList(''),
		enabled: rest.open,
	});

	const customerOptions = useMemo(() => {
		const currCustomer = data?.customers?.[0]?.customer;
		const options =
			customerData?.data?.customers?.reduce((acc, { id, fullName }) => {
				if (currCustomer?.id === id) {
					return acc;
				}
				acc.push({
					value: id,
					label: fullName,
				});

				return acc;
			}, [] as { value: string; label: string }[]) ?? [];

		if (currCustomer) {
			options.push({
				value: currCustomer.id,
				label: currCustomer.fullName,
			});
		}

		return options;
	}, [
		JSON.stringify(customerData?.data?.customers ?? {}),
		JSON.stringify(data?.customers?.[0]),
	]);

	const employeeOptions = useMemo(() => {
		const empHead = data?.manageProjects?.[0]?.employee;
		console.log(empHead);
		const options =
			employeeListData?.data?.employees?.reduce((acc, { id, fullName }) => {
				if (empHead?.id === id) {
					return acc;
				}
				acc.push({
					value: id,
					label: fullName,
				});
				return acc;
			}, [] as { value: string; label: string }[]) ?? [];

		if (empHead) {
			options.push({
				value: empHead.id,
				label: empHead.fullName,
			});
		}

		return options;
	}, [
		JSON.stringify(employeeListData?.data?.employees ?? {}),
		JSON.stringify(data?.manageProjects?.[0]?.employee),
	]);

	const departmentOptions = useMemo(() => {
		const departments = departmentData?.data?.departments;
		if (!isEdit) return departments;
		if (departments?.length) {
			return departments.filter(
				(dp) => !data?.departments?.find((_dp) => _dp.idDepartment === dp.id)
			);
		}
		return [];
	}, [data?.departments, departmentData?.data?.departments, isEdit]);

	const { mutate: addProject, isLoading } = useMutation({
		mutationFn: isEdit ? ProjectServices.update : ProjectServices.add,
		onSuccess: () => {
			toast.success(`${isEdit ? 'Chỉnh sửa' : 'Thêm'} dự án thành công`);
			rest.onRefresh?.();
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as ReactNode);
		},
		onSettled: () => rest.onClose(),
	});

	const form = useForm({
		resolver: yupResolver(
			ProjectSchema(isEdit, isManage && !isSingleProject)
		) as any,
	});

	useEffect(() => {
		if (rest.open && isEdit) {
			const _payload = omit(data, [
				'startDate',
				'finishDateET',
				'departments',
				'manageProjects',
			]);

			const idEmpHead = data?.manageProjects?.[0]?.idEmpHead;
			const idCustomer = data?.customers?.[0]?.idCustomer;

			const dates = {
				startDate: dayjs(data?.startDate).isValid()
					? dayjs(data?.startDate).format('YYYY-MM-DD')
					: null,
				finishDateET: dayjs(data?.finishDateET).isValid()
					? dayjs(data?.finishDateET).format('YYYY-MM-DD')
					: null,
			};
			form.reset({
				..._payload,
				...dates,
				idEmpHead,
				idCustomer,
			});
		} else {
			form.reset();
		}
	}, [data, form, isEdit, rest.open]);

	const handleError: SubmitErrorHandler<Partial<IProject>> = (errors) => {
		const keys = Object.keys(errors) as (keyof IProject)[];
		toast.error(errors[keys[0]]?.message as ReactNode);
	};

	const handleSuccess: SubmitHandler<Partial<IProject>> = (values) => {
		if (isEdit) {
			values.id = data?.id;
			delete values.startDate;
			delete values.finishDateET;
		}
		addProject(pickBy(values, identity) as IProject);
	};

	return (
		<Modal {...rest} loading={isLoading}>
			<form
				className="space-y-4"
				onSubmit={form.handleSubmit(handleSuccess, handleError)}
			>
				<div>
					<Label required>Tên dự án</Label>
					<Input {...form.register('name')} placeholder="tên dự án" />
				</div>
				<div className="flex items-center gap-4">
					<div className="flex-1">
						<Label required>Ngày bắt đầu</Label>
						<Input
							{...form.register('startDate')}
							type="date"
							disabled={isEdit}
						/>
					</div>
					<div className="flex-1">
						<Label required>Ngày hoàn thành dự kiến</Label>
						<Input
							{...form.register('finishDateET')}
							type="date"
							disabled={isEdit}
						/>
					</div>
				</div>

				{isManage && !isSingleProject ? (
					<ReactSelect
						isLoading={fetchingEmployees}
						labelProps={{ required: true }}
						name="idEmpHead"
						control={form.control}
						placeholder="quản lý"
						title="Quản lý dự án"
						options={employeeOptions ?? []}
					/>
				) : null}
				<ReactSelect
					isLoading={fetchingCustomers}
					name="idCustomer"
					control={form.control}
					placeholder="khách hàng"
					title="Khách hàng"
					options={customerOptions}
					isClearable
				/>
				{isEdit ? (
					data?.departments?.length ? (
						<div>
							<Label required>Phòng ban hiện tại</Label>
							<ul className="grid grid-cols-fill-80 gap-2 text-sm">
								{data?.departments?.map(({ department }, idx) => (
									<li
										key={department?.id ?? idx}
										className="bg-primary text-muted rounded-md text-center py-1"
									>
										{department?.name}
									</li>
								))}
							</ul>
						</div>
					) : null
				) : null}
				{isManage && !isSingleProject ? (
					<ReactSelect
						isLoading={isFetching}
						name="departments"
						control={form.control}
						placeholder="phòng ban"
						isMulti
						title="Phòng ban"
						options={
							departmentOptions?.map(({ name, id }: IDepartment) => ({
								value: id,
								label: name,
							})) ?? []
						}
					/>
				) : null}
				<div>
					<Label>Mô tả</Label>
					<Textarea {...form.register('note')} placeholder="mô tả" rows={5} />
				</div>
				<div className="items-center justify-end gap-4 flex mt-2">
					<Button type="button" variant="outline" onClick={rest.onClose}>
						Đóng
					</Button>
					<Button type="submit">Xác nhận</Button>
				</div>
			</form>
		</Modal>
	);
};

export default ModalThemDuAn;
