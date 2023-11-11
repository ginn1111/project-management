import GroupSelectNhanVien from '@/components/special/group-select-nhan-vien';
import PhanQuyenDauViec from '@/components/special/phan-quyen-dau-viec';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { QueryKeys } from '@/constants/query-key';
import { WorkProjectServices } from '@/lib';
import { formatPermission } from '@/utils/helpers';
import { AxiosError, AxiosResponse } from 'axios';
import { id } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const ModalPhanQuyen = (props: Omit<IModalProps<IWorkProject>, 'children'>) => {
	const { data, ...rest } = props;
	const router = useRouter();
	const empRef = useRef<UseFormReturn>();
	const permissionRef = useRef<UseFormReturn>();

	const [idEmpProject, setIdEmpProject] = useState();

	const { mutate: assignPermission, isLoading } = useMutation({
		mutationFn: WorkProjectServices.assignPermission,
		onSuccess: () => {
			toast.success('Phân quyền cho nhân viên thành công');
			router.refresh();
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
		onSettled: () => {
			rest.onClose();
		},
	});

	const { isFetching } = useQuery<
		AxiosResponse<{ permissions: IWorkOfPermission[] }>
	>({
		queryKey: QueryKeys.getPermissionsOfWorkOfEmp(
			data?.id ?? '',
			empRef.current?.getValues('idEmployee')
		),
		queryFn: ({ queryKey }) =>
			WorkProjectServices.getWorkPermission({
				idWorkProject: queryKey[1] as string,
				idEmpProject: queryKey[2] as string,
			}),
		enabled: !!idEmpProject && !!data?.id,
		onSuccess: (data) => {
			permissionRef.current?.reset(
				data?.data?.permissions?.reduce(
					(acc: Record<string, boolean>, { idPermission }) => {
						acc[idPermission] = true;
						return acc;
					},
					{} as Record<string, boolean>
				)
			);
		},
	});

	const handleSubmit = () => {
		const idEmp = empRef.current?.getValues('idEmployee');
		if (!idEmp) {
			toast.error('Vui lòng chọn nhân viên');
			return;
		}
		const permissionArr = formatPermission(
			permissionRef.current?.getValues() ?? {}
		);
		if (!permissionArr?.length) {
			toast.error('Vui lòng chọn quyền');
			return;
		}
		const idWorkProject = data?.id;
		if (!idWorkProject) {
			toast.error('Mã đầu việc không đúng, vui lòng reload lại trang');
			return;
		}

		assignPermission({
			idEmpProject: idEmp,
			idWorkProject: data?.id,
			permissions: permissionArr,
		});
	};

	return (
		<Modal {...rest} loading={isLoading}>
			<GroupSelectNhanVien
				ref={empRef}
				onWatch={(_, data: any) => {
					setIdEmpProject(data.idEmployee);
				}}
			/>
			<Label className="mb-0">Quyền</Label>
			{rest.open ? <PhanQuyenDauViec ref={permissionRef} /> : null}

			<div className="flex items-center justify-end gap-4 mt-4">
				<Button type="button" onClick={rest.onClose} variant="outline">
					Đóng
				</Button>
				<Button onClick={handleSubmit}>Xác nhận</Button>
			</div>
		</Modal>
	);
};

export default ModalPhanQuyen;
