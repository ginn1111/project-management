import ThemNguonLuc from '@/components/special/them-nguon-luc';
import { Button } from '@/components/ui/button';
import Modal, { IModalProps } from '@/components/ui/modal';
import { WorkProjectServices } from '@/lib';
import { formatResourceForm } from '@/utils/format-resource-form';
import { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const ModalThemNguonLuc = (
	props: Omit<IModalProps<ITaskOfWork>, 'children'> & { idProject?: string }
) => {
	const { idProject, data, ...rest } = props;
	const { id } = useParams();
	const router = useRouter();
	const { mutate: addResourceForTask, isLoading } = useMutation({
		mutationFn: WorkProjectServices.addResourceForTask,
		onSuccess: () => {
			toast.success('Thêm nguồn lực thành công');
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
		onSettled: () => {
			rest?.onClose?.();
			router.refresh();
		},
	});
	const refNL = useRef<UseFormReturn>();

	const handleAddResource = () => {
		const resource = formatResourceForm(
			refNL.current?.getValues() as Record<
				string,
				{ active?: boolean; number?: number }
			>
		);
		if (!resource?.length) {
			toast.error('Bạn cần chọn ít nhất một nguồn lực!');
			return;
		}
		addResourceForTask({
			resource,
			idTask: data?.idTask!,
			idTaskOfWork: data?.id!,
			idProject: id as string,
		});
	};

	return (
		<Modal {...rest} loading={isLoading}>
			<ThemNguonLuc
				type="resourceOfProject"
				ref={refNL}
				scrollAreaProps={{ className: 'h-[65vh]' }}
				idProject={idProject}
			/>
			<div className="flex items-center justify-end gap-4 mt-4">
				<Button onClick={rest?.onClose} variant="outline">
					Đóng
				</Button>
				<Button onClick={handleAddResource}>Xác nhận</Button>
			</div>
		</Modal>
	);
};

export default ModalThemNguonLuc;
