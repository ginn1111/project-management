import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Label from '@/components/ui/my-label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { QualificationServices } from '@/lib';
import { RoleSchema } from '@/yup-schema/qualification';
import { yupResolver } from '@hookform/resolvers/yup';
import { pick } from 'lodash';
import { AlertCircleIcon } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const ModalChuyenMon = (
	props: Omit<IModalProps<Partial<IRole & { idEmp: string }>>, 'children'> & {
		isEdit?: boolean;
	}
) => {
	const { onRefresh, isEdit, data, ...rest } = props;

	const { mutate, isLoading } = useMutation({
		mutationFn: QualificationServices.addRole,
		onSuccess: () => {
			toast.success('Thêm chuyên môn thành công');
			rest?.onClose?.();
			onRefresh?.();
		},
		onError: (error: AxiosError) => {
			toast.error(error?.response?.data as string);
		},
	});
	const { reset, getValues, register, handleSubmit } = useForm({
		resolver: yupResolver(RoleSchema) as any,
	});

	useEffect(() => {
		if (rest.open && isEdit) {
			reset({ ...pick(data, ['roleName', 'note']) });
		} else {
			reset({ roleName: '', note: '' });
		}
	}, [rest.open]);

	const handleSuccess = () => {
		if (!data?.id) {
			toast.error('Id bằng cấp không hợp lệ!');
			return;
		}
		const payload = {
			idQualification: data.id!,
			idEmp: data.idEmp!,
			...getValues(),
		};
		mutate(payload);
	};

	const handleError: SubmitErrorHandler<IRole> = (errors) => {
		const keys = Object.keys(errors) as (keyof IRole)[];
		toast.error(errors[keys[0]]?.message as ReactNode);
	};

	return (
		<Modal {...rest} loading={isLoading}>
			<form
				className="space-y-4"
				onSubmit={handleSubmit(handleSuccess, handleError)}
			>
				<Alert className="text-warning border-warning bg-warning-light">
					<AlertCircleIcon className="w-5 h-5" stroke="#fbbf24" />
					<AlertTitle>Warning</AlertTitle>
					<AlertDescription>
						Chuyên môn của nhân viên sẽ được áp dụng vào phòng ban hiện tại
					</AlertDescription>
				</Alert>
				<div>
					<Label required>Tên chuyên môn</Label>
					<Input {...register('roleName')} placeholder="tên chuyên môn" />
				</div>
				<div>
					<Label>Ghi chú</Label>
					<Textarea {...register('note')} placeholder="ghi chú" rows={10} />
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

export default ModalChuyenMon;
