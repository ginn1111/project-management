import { Button } from '@/components/ui/button';
import Modal, { IModalProps } from '@/components/ui/modal';
import Label from '@/components/ui/my-label';
import { Textarea } from '@/components/ui/textarea';
import { ProjectServices } from '@/lib';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface IModalBaoCao extends Omit<IModalProps<Partial<IReport>>, 'children'> {
	isEdit?: boolean;
	initialValues?: Partial<IReport>;
}

const ModalBaoCao = (props: IModalBaoCao) => {
	const { initialValues, isEdit, data, ...rest } = props;
	const { id } = useParams();

	const { mutate: createReport, isLoading } = useMutation({
		mutationFn: ProjectServices.createReport,
		onSettled: () => rest.onClose(),
		onSuccess: () => {
			toast.success('Tạo báo cáo thành công');
			rest.onRefresh?.();
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as ReactNode);
		},
	});
	const form = useForm();

	const handleSuccess: SubmitHandler<Partial<IReport>> = (values) => {
		createReport({
			content: form.getValues('content'),
			idProject: id as string,
		});
	};

	return (
		<Modal {...rest} loading={isLoading}>
			<form className="space-y-4" onSubmit={form.handleSubmit(handleSuccess)}>
				<Label required>Nội dung báo cáo</Label>
				<Textarea
					{...form.register('content')}
					placeholder="nội dung"
					rows={15}
				/>
				<div className="items-center justify-end gap-4 flex mt-2">
					<Button type="button" variant="outline" onClick={rest.onClose}>
						Đóng
					</Button>
					<Button disabled={!form.watch('content').trim()}>Xác nhận</Button>
				</div>
			</form>
		</Modal>
	);
};

export default ModalBaoCao;
