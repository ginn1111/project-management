import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Modal, { IModalProps } from '@/components/ui/modal';
import Label from '@/components/ui/my-label';
import { Textarea } from '@/components/ui/textarea';
import { WorkProjectServices } from '@/lib';
import { WorkSchema } from '@/yup-schema/work';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { ReactNode, useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface IModalTaoDauViec
	extends Omit<IModalProps<Partial<IWorkProject>>, 'children'> {
	isEdit?: boolean;
}

const ModalTaoDauViec = (props: IModalTaoDauViec) => {
	const { isEdit, data, ...rest } = props;
	const { mutate: addWork, isLoading } = useMutation({
		mutationFn: isEdit ? WorkProjectServices.update : WorkProjectServices.add,
		onSettled: () => rest.onClose(),
		onSuccess: () => {
			toast.success(`${isEdit ? 'Cập nhật' : 'Thêm'} đầu việc thành công`);
			rest.onRefresh?.();
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as ReactNode);
		},
	});
	const form = useForm({
		resolver: yupResolver(WorkSchema(isEdit, data?.finishDateET)) as any,
	});

	useEffect(() => {
		if (rest.open && isEdit) {
			const { startDate, finishDateET, work, note } = data ?? {};
			form.reset({
				startDate: dayjs(startDate).isValid()
					? dayjs(startDate).format('YYYY-MM-DD')
					: undefined,
				finishDateET: dayjs(finishDateET).isValid()
					? dayjs(finishDateET).format('YYYY-MM-DD')
					: undefined,
				...work,
				note,
			});
		} else {
			form.reset();
		}
	}, [rest.open]);

	const handleSuccess: SubmitHandler<Partial<IWorkProject>> = (values) => {
		const payload = {
			...values,
			id: data?.id,
			idProject: data?.idProject!,
		};
		addWork(payload);
	};

	const handleError: SubmitErrorHandler<Partial<IWorkProject>> = (errors) => {
		const keys = Object.keys(errors) as (keyof IWorkProject)[];
		toast.error(errors[keys[0]]?.message as ReactNode);
	};

	return (
		<Modal {...rest} loading={isLoading}>
			<form
				className="space-y-4"
				onSubmit={form.handleSubmit(handleSuccess, handleError)}
			>
				<div>
					<Label required>Tên đầu việc</Label>
					<Input {...form.register('name')} placeholder="tên đầu việc" />
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
					<Textarea {...form.register('note')} placeholder="mô tả" rows={10} />
				</div>
				<div className="items-center justify-end gap-4 flex mt-2">
					<Button type="button" variant="outline" onClick={rest.onClose}>
						Đóng
					</Button>
					<Button>Xác nhận</Button>
				</div>
			</form>
		</Modal>
	);
};

export default ModalTaoDauViec;
