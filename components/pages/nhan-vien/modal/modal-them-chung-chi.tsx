import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { CertificationServices } from '@/lib';
import { CertificationSchema } from '@/yup-schema/certification';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { identity, pick, pickBy } from 'lodash';
import { ReactNode, useEffect } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const ModalThemChungChi = (
	props: Omit<
		IModalProps<Partial<ICertsEmployee & ICertification>>,
		'children'
	> & {
		isEdit?: boolean;
	}
) => {
	const { isEdit = false, onRefresh, data, ...rest } = props;
	const { mutate, isLoading } = useMutation({
		mutationFn: !isEdit
			? CertificationServices.create
			: CertificationServices.update,
		onSuccess: () => {
			toast.success('Thêm chứng chỉ thành công');
			rest?.onClose?.();
			onRefresh?.();
		},
	});
	const { reset, getValues, register, handleSubmit } = useForm({
		resolver: yupResolver(CertificationSchema) as any,
	});

	useEffect(() => {
		if (rest.open && isEdit) {
			const { expiredDate, date, note, certification } = pick(data, [
				'expiredDate',
				'date',
				'note',
				'certification',
			]);
			reset({
				name: certification?.name,
				date: dayjs(date).isValid()
					? dayjs(date).format('YYYY-MM-DD')
					: undefined,
				expiredDate: dayjs(expiredDate).isValid()
					? dayjs(expiredDate).format('YYYY-MM-DD')
					: undefined,
				note,
			});
		} else {
			reset({ name: '', note: '', date: null, expiredDate: null });
		}
	}, [rest.open]);

	const handleSubmitForm = () => {
		const expiredDate = getValues('expiredDate');
		const startDate = getValues('date');

		const isValid = dayjs(expiredDate).isAfter(startDate, 'd');
		if (!isValid && expiredDate && startDate) {
			toast.error('Ngày kết thúc phải lớn hơn ngày bắt đầu');
			return;
		}

		const payload = {
			...pickBy(getValues(), identity),
			...(!isEdit
				? {
						idEmployee: data?.idEmployee,
				  }
				: {
						id: data?.idCertification,
				  }),
		};

		mutate(payload);
	};

	const handleError: SubmitErrorHandler<any> = (errors) => {
		const keys = Object.keys(errors) as (keyof IEmployee)[];
		toast.error(errors[keys[0]]?.message as ReactNode);
	};

	return (
		<Modal
			loading={isLoading}
			{...rest}
			title={`${isEdit ? 'Sửa' : 'Thêm'} ${rest.title}`}
		>
			<form
				onSubmit={handleSubmit(handleSubmitForm, handleError)}
				className="space-y-4"
			>
				<div>
					<Label>Tên chứng chỉ</Label>
					<Input {...register('name')} placeholder="tên chứng chỉ" />
				</div>
				<div className="flex items-center gap-4">
					<div className="flex-1">
						<Label>Ngày cấp</Label>
						<Input {...register('date')} type="date" className="ngày cấp" />
					</div>
					<div className="flex-1">
						<Label>Ngày hết hạn</Label>
						<Input
							{...register('expiredDate')}
							type="date"
							className="ngày hêt hạn"
						/>
					</div>
				</div>
				{/* <div>
          <Label>Hình ảnh chứng chỉ</Label>
          <Input type="file" className="hình ảnh chứng chỉ" />
        </div> */}
				<div>
					<Label>Ghi chú</Label>
					<Textarea {...register('note')} placeholder="ghi chú" />
				</div>
				<div className="flex items-center justify-end gap-4 mt-4">
					<Button type="button" onClick={rest?.onClose} variant="outline">
						Đóng
					</Button>
					<Button>Xác nhận</Button>
				</div>
			</form>
		</Modal>
	);
};

export default ModalThemChungChi;
