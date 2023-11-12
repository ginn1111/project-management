import ThemNguonLuc from '@/components/special/them-nguon-luc';
import { Button } from '@/components/ui/button';
import Modal, { IModalProps } from '@/components/ui/modal';
import { ProjectServices } from '@/lib';
import { formatResourceForm } from '@/utils/format-resource-form';
import { AxiosError } from 'axios';
import { ReactNode, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const ModalThemNguonLuc = (
	props: Omit<IModalProps<Partial<IProject>>, 'children'>
) => {
	const { data, onRefresh, ...rest } = props;
	const themNLRef = useRef<UseFormReturn>();

	const { mutate: addResource, isLoading } = useMutation({
		mutationFn: ProjectServices.addResource,
		onSuccess: () => {
			toast.success('Thêm nguồn lực thành công!');
			onRefresh?.();
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as ReactNode);
		},
		onSettled: () => {
			rest.onClose();
		},
	});

	const handleThemNL = () => {
		const payload = {
			id: data?.id!,
			resource: formatResourceForm(
				themNLRef.current?.getValues() as Record<
					string,
					{ active?: boolean; number?: number }
				>
			),
		};
		addResource(payload);
	};

	return (
		<Modal {...rest} loading={isLoading}>
			<ThemNguonLuc
				ref={themNLRef}
				scrollAreaProps={{ className: 'h-[65vh]' }}
			/>
			<div className="items-center justify-end gap-4 flex mt-2">
				<Button variant="outline" onClick={rest.onClose}>
					Đóng
				</Button>
				<Button onClick={handleThemNL}>Xác nhận</Button>
			</div>
		</Modal>
	);
};

export default ModalThemNguonLuc;
