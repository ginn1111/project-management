import GroupSelectNhanVien from '@/components/special/group-select-nhan-vien';
import { Button } from '@/components/ui/button';
import Modal, { IModalProps } from '@/components/ui/modal';
import { WorkProjectServices } from '@/lib';
import { AxiosError } from 'axios';
import { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const ModalGiaoViec = <T,>(
	props: Omit<IModalProps<IWorkProject>, 'children'>
) => {
	const { data, ...rest } = props;
	const refNv = useRef<UseFormReturn<{ idEmployee: string }>>();

	const { mutate: assign, isLoading } = useMutation({
		mutationFn: WorkProjectServices.assign,
		onSuccess: () => {
			rest.onRefresh?.();
			toast.success('Giao việc cho nhân viên thành công');
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
		onSettled: () => {
			rest.onClose();
		},
	});

	const handleAssign = () => {
		const { idEmployee } = refNv.current?.getValues() ?? {};
		const payload = {
			idEmployee,
			id: data?.id,
			idProject: data?.idProject,
		};

		assign(payload);
	};

	return (
		<Modal {...rest} loading={isLoading}>
			<GroupSelectNhanVien ref={refNv} />
			<div className="items-center justify-end gap-4 flex mt-2">
				<Button variant="outline" onClick={rest.onClose}>
					Đóng
				</Button>
				<Button onClick={handleAssign}>Xác nhận</Button>
			</div>
		</Modal>
	);
};

export default ModalGiaoViec;
