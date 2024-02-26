import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Modal, { IModalProps } from '@/components/ui/modal';
import Label from '@/components/ui/my-label';
import ReactSelect from '@/components/ui/react-select';
import { Textarea } from '@/components/ui/textarea';
import { ResourceServices } from '@/lib';
import { getResourceTypeList } from '@/lib/utils/resource-type';
import { ResourceSchema } from '@/yup-schema/resource';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { identity, pickBy } from 'lodash';
import { ReactNode, useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

interface IModalThemNguonLuc<T> extends Omit<IModalProps<T>, 'children'> {
	isEdit?: boolean;
}

const ModalThemNguonLuc = (props: IModalThemNguonLuc<Partial<IEmployee>>) => {
	const { data, onRefresh, isEdit = false, ...rest } = props;

	const { isFetching, data: resourceTypeList } = useQuery({
		queryFn: getResourceTypeList,
		queryKey: ['resource-type'],
	});
	const { mutate, isLoading } = useMutation({
		mutationFn: !isEdit ? ResourceServices.create : ResourceServices.update,
		onSuccess: () => {
			toast.success(`${!isEdit ? 'Thêm' : 'Cập nhật'} nguồn lực thành công`);
			onRefresh?.();
			rest?.onClose?.();
		},
		onError: (error) => {
			toast.error((error as AxiosError).response?.data as ReactNode);
			rest?.onClose?.();
		},
	});

	const { setValue, handleSubmit, control, register, getValues, reset } =
		useForm<Partial<IResource>>({
			defaultValues: {
				amount: 0,
			},
			resolver: yupResolver(ResourceSchema) as any,
		});

	useEffect(() => {
		if (!rest.open) {
			reset({ amount: 0 });
		} else {
			if (isEdit) {
				reset(data);
			}
		}
	}, [rest.open]);

	const handleSuccess: SubmitHandler<Partial<IResource>> = (values) => {
		const payload = pickBy(values, identity) as IResource;
		mutate(payload);
	};

	const handleError: SubmitErrorHandler<Partial<IResource>> = (errors) => {
		const keys = Object.keys(errors) as (keyof IResource)[];
		toast.error(errors[keys[0]]?.message as ReactNode);
	};

	return (
		<Modal {...rest} loading={isLoading || isFetching}>
			<form
				className="space-y-4"
				onSubmit={handleSubmit(handleSuccess, handleError)}
			>
				<div>
					<Label required>Tên nguồn lực</Label>
					<Input {...register('name')} placeholder="tên nguồn lực" />
				</div>
				<div className="flex items-center gap-4">
					<ReactSelect
						labelProps={{ required: true }}
						containerClass="flex-1"
						control={control}
						name="idResourceType"
						title="Loại nguồn lực"
						options={resourceTypeList?.data?.map(
							({ id, name }: IResourceType) => ({
								label: name,
								value: id,
							})
						)}
						placeholder="loại nguồn lực"
					/>

					<div className="flex-1">
						<Label required>số lượng</Label>
						<Input
							{...register('amount')}
							type="number"
							placeholder="số lượng"
						/>
					</div>
				</div>
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

export default ModalThemNguonLuc;
