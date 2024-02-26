import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Modal, { IModalProps } from '@/components/ui/modal';
import Label from '@/components/ui/my-label';
import ReactSelect from '@/components/ui/react-select';
import { QueryKeys } from '@/constants/query-key';
import { EmployeeServices, ProjectServices } from '@/lib';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { AxiosError, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
	FormProvider,
	SubmitHandler,
	useForm,
	useFormContext,
} from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const ModalDieuPhoi = (props: Omit<IModalProps, 'children'>) => {
	const { data: _data } = useSession();
	const { user: session } = _data ?? {};
	const idDepartment = session?.info.departments?.[0]?.idDepartment;
	const router = useRouter();
	const form = useForm({
		shouldUnregister: true,
	});

	const { data, ...rest } = props;

	const { data: employeeListData } = useQuery({
		queryKey: QueryKeys.getEmployeeByDepartmentAndProject(
			form.watch('idProject'),
			idDepartment ?? ''
		),
		queryFn: ({ queryKey }) =>
			EmployeeServices.getListByDepartmentAndProject(queryKey[1], queryKey[2]),
		enabled: rest.open && !!idDepartment && !!form.watch('idProject'),
		onError: (error) => {
			toast.error((error as AxiosError)?.response?.data as string);
		},
	});

	const { mutate: addEmployeesToProject, isLoading } = useMutation({
		mutationFn: ProjectServices.addEmployees,

		onSuccess: () => {
			router.refresh();
			toast.success('Thêm nhân viên vào dự án thành công');
		},
		onError: (error) => {
			toast.error((error as AxiosError)?.response?.data as string);
		},
		onSettled: () => {
			rest?.onClose?.();
		},
	});

	const { data: projectListData, isFetching } = useQuery<
		AxiosResponse<{ projects: IProject[] }>
	>({
		queryKey: QueryKeys.getProject(idDepartment ?? ''),
		queryFn: () =>
			ProjectServices.getList(`idDepartment=${idDepartment}&isDone=false`),
		enabled: rest.open && !!idDepartment,
		onError: (error) => {
			toast.error((error as AxiosError)?.response?.data as string);
		},
	});

	useEffect(() => {
		form.setValue('employees', []);
	}, [form.watch('idProject')]);

	const findProject = (): Partial<IProject> => {
		return (
			projectListData?.data?.projects?.find(
				(project) => project.id === form.watch('idProject')
			) ?? {}
		);
	};

	const handleDP: SubmitHandler<any> = (values) => {
		addEmployeesToProject({
			...values,
			employees: values.employees.filter(Boolean),
		});
	};

	return (
		<Modal {...rest} loading={isFetching || isLoading}>
			<form onSubmit={form.handleSubmit(handleDP)}>
				<div>
					<Label required>Dự án</Label>
					<ReactSelect
						name="idProject"
						placeholder="Chọn dự án"
						control={form.control}
						title=""
						options={
							projectListData?.data?.projects?.map((project: IProject) => ({
								value: project.id,
								label: project.name,
							})) ?? []
						}
					/>
				</div>
				{form.watch('idProject') ? (
					<div>
						{(() => {
							const _findProject = findProject();
							return (
								<div className="mt-4 border-dashed border-b border-[#ccc] mb-4 pb-2 text-sm">
									<p>Thời gian</p>
									{dayjs(_findProject.startDate).format('ddd, DD/MM/YYYY')}
									<span className="mx-2">-</span>
									{dayjs(_findProject.finishDateET).format('ddd, DD/MM/YYYY')}
								</div>
							);
						})()}

						<Label required>Nhân viên chưa tham gia</Label>
						<ScrollArea className="h-[200px] w-full rounded-md border px-4 py-2">
							<FormProvider {...form}>
								{employeeListData?.data?.employees?.map(
									(employee: IEmployee, idx: number) => (
										<DPItem
											key={employee.id}
											name={employee.fullName}
											roles={
												employee.roles
													?.map((role) => role.roleName)
													?.join(',') ?? ''
											}
											idEmployee={employee.id}
											nameInput={`employees.${idx}`}
										/>
									)
								)}
							</FormProvider>
						</ScrollArea>
					</div>
				) : null}
				<div className="items-center justify-end gap-4 flex mt-8">
					<Button type="button" variant="outline" onClick={rest?.onClose}>
						Đóng
					</Button>
					<Button
						disabled={
							!form.watch('idProject') ||
							!form.watch('employees').filter(Boolean)?.length
						}
						type="submit"
					>
						Xác nhận
					</Button>
				</div>
			</form>
		</Modal>
	);
};

type DPItemProps = {
	name: string;
	idEmployee: string;
	roles: string;
	nameInput: string;
};

const DPItem = ({ nameInput, name, idEmployee, roles }: DPItemProps) => {
	const form = useFormContext();

	return (
		<div className="flex items-center gap-8 text-sm mt-2">
			<Checkbox
				id={idEmployee}
				checked={!!form.watch(nameInput)}
				onCheckedChange={(checked) =>
					form.setValue(nameInput, checked ? idEmployee : null)
				}
			/>
			<label htmlFor={idEmployee} className="mb-0">
				{name}
			</label>
			<p>{roles ? <>[{roles}]</> : null}</p>
		</div>
	);
};

export default ModalDieuPhoi;
