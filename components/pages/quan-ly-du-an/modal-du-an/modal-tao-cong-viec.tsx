import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Label from '@/components/ui/my-label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { ReactNode } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { yupResolver } from '@hookform/resolvers/yup';
import { TaskSchema } from '@/yup-schema/task';

interface IModalTaoCongViec<T> extends Omit<IModalProps, 'children'> {
	open: boolean;
	data: T;
	title: ReactNode;
	onClose: () => void;
}

const ModalTaoCongViec = <T,>(props: IModalTaoCongViec<T>) => {
	const { data, ...rest } = props;
	const form = useForm({
		resolver: yupResolver(TaskSchema) as any,
	});

	const handleSuccess: SubmitHandler<Partial<ITask>> = (values) => {
		console.log(values);
	};

	const handleError: SubmitErrorHandler<Partial<ITask>> = (errors) => {
		const keys = Object.keys(errors) as (keyof ITask)[];
		toast.error(errors[keys[0]]?.message as ReactNode);
	};

	return (
		<Modal {...rest}>
			<form
				className="space-y-4"
				onSubmit={form.handleSubmit(handleSuccess, handleError)}
			>
				<div>
					<Label required>Tên công việc</Label>
					<Input {...form.register('name')} placeholder="tên công việc" />
				</div>
				<div>
					<Label required>Ngày bắt đầu</Label>
					<Input {...form.register('startDate')} type="date" />
				</div>
				<div>
					<Label required>Ngày hoàn thành dự kiến</Label>
					<Input {...form.register('finishDateET')} type="date" />
				</div>
				<div>
					<Label>Mô tả</Label>
					<Textarea
						{...form.register('description')}
						placeholder="Mô tả"
						rows={5}
					/>
				</div>

				<div className="flex items-center justify-end gap-4 mt-4">
					<Button type="button" onClick={rest.onClose} variant="outline">
						Đóng
					</Button>
					<Button>Xác nhận</Button>
				</div>
			</form>
		</Modal>
	);
};

export default ModalTaoCongViec;
