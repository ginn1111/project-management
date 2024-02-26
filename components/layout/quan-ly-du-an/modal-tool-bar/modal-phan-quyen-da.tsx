import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Role } from '@/constants/general';
import { QueryKeys } from '@/constants/query-key';
import { EmployeeServices, ProjectServices } from '@/lib';
import { AxiosError, AxiosResponse } from 'axios';
import { isNil } from 'lodash';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

interface IModalPhanQuyenDA<T> extends Omit<IModalProps, 'children'> {
	data: T;
}

const ModalPhanQuyenDA = <T,>(props: IModalPhanQuyenDA<T>) => {
	const { data, ...rest } = props;
	const { id } = useParams();
	const form = useForm();

	const memoRef = useRef<Record<string, boolean>>();

	const { data: manageProjectsData, isFetching: fetchingManageProject } =
		useQuery({
			queryKey: QueryKeys.getManageProject(id as string),
			queryFn: ({ queryKey }) =>
				ProjectServices.getManageOfProject(queryKey[1] as string),
			enabled: !!rest.open && !!id,
			onError: (error: AxiosError) => {
				toast.error(error?.response?.data as string);
			},
		});

	const { data: masterEmployeeListData, isFetching: fetchingMasterList } =
		useQuery<AxiosResponse<{ employees: IEmployee[]; totalItems: number }>>({
			queryKey: QueryKeys.getEmployee(),
			queryFn: ({}) =>
				EmployeeServices.getList(`code=${Role.QUAN_LY_TRUONG_PHONG}`),
			enabled: !!rest.open,
			onError: (error) => {
				toast.error((error as AxiosError)?.response?.data as string);
			},
		});

	const { mutate, isLoading } = useMutation({
		mutationFn: ProjectServices.addManageProject,
		onSuccess: (response) => {
			toast.success(response.data as string);
		},
		onError: (error: AxiosError) => {
			toast.success(error?.response?.data as string);
		},
		onSettled: () => {
			rest?.onClose?.();
		},
	});

	const manageProjectList: { id: string; fullName: string }[] = useMemo(() => {
		const checkArr: string[] = [];
		const baseArray =
			manageProjectsData?.data?.manageProject?.map(
				({ idEmpHead, employee }: IManageProject) => {
					checkArr.push(idEmpHead);
					return {
						id: idEmpHead,
						fullName: employee?.fullName,
					};
				}
			) ?? [];

		const remainArr =
			masterEmployeeListData?.data?.employees?.reduce(
				(acc, { id, fullName }) => {
					if (checkArr.includes(id)) return acc;
					acc.push({ id, fullName });
					return acc;
				},
				[] as { id: string; fullName: string }[]
			) ?? [];

		const formatDataForm = {
			...formatManageOfProjectCombine(baseArray),
			...formatManageOfProjectCombine(remainArr, false),
		};

		form.reset({ ...formatDataForm });

		memoRef.current = structuredClone(formatDataForm);

		return [...baseArray, ...remainArr];
	}, [
		masterEmployeeListData?.data?.employees,
		manageProjectsData?.data?.manageProject,
	]);

	const handleSubmit = () => {
		const payload = formatPayload(form.getValues(), memoRef.current ?? {});
		if (!payload?.length) {
			toast.error('Không có gì thay đổi');
			return;
		}
		mutate({ idProject: id as string, manageProject: payload });
	};

	useEffect(() => {
		if (!rest.open) {
			form.reset();
		}
	}, [rest.open]);

	return (
		<Modal
			{...rest}
			loading={fetchingManageProject || fetchingMasterList || isLoading}
		>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label className="mb-0">Quản lý dự án - Tham gia dự án</Label>
					<ScrollArea className="h-[200px] w-full rounded-md border p-2">
						{manageProjectList?.map(({ id, fullName }) => (
							<div className="flex items-center gap-4 my-4" key={id}>
								<Checkbox
									id={id}
									onCheckedChange={(isChecked) => form.setValue(id, isChecked)}
									checked={!!form.watch(id)}
								/>
								<Label htmlFor={id} className="mb-0">
									{fullName}
								</Label>
							</div>
						))}
					</ScrollArea>
				</div>
			</div>

			<div className="items-center justify-end gap-4 flex mt-2">
				<Button variant="outline" onClick={rest?.onClose}>
					Đóng
				</Button>
				<Button onClick={handleSubmit}>Xác nhận</Button>
			</div>
		</Modal>
	);
};

const formatManageOfProjectCombine = (manageProjects: any[], isAdd = true) =>
	manageProjects.reduce((acc, { id }) => {
		acc[id] = isAdd;
		return acc;
	}, {});

const formatManageOfProject = (manageProjects: any[], isAdd = true) =>
	manageProjects.reduce((acc, manageProject) => {
		acc[manageProject.idEmpHead] = isAdd;
		return acc;
	}, {});

const formatPayload = (
	payload: Record<string, boolean>,
	memoPayload: Record<string, boolean>
) => {
	return Object.entries(payload ?? {}).reduce((acc, [id, isAdd]) => {
		if (isNil(memoPayload[id]) || memoPayload[id] !== isAdd) {
			acc.push({ id, isAdd });
		}
		return acc;
	}, [] as { id: string; isAdd: boolean }[]);
};

export default ModalPhanQuyenDA;
