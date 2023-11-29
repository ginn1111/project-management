import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Modal, { IModalProps } from '@/components/ui/modal';
import Label from '@/components/ui/my-label';
import ReactSelect from '@/components/ui/react-select';
import { generateOptions } from '@/constants/generate-options';
import { GenderIndex } from '@/constants/indexes';
import { CustomerServices } from '@/lib';
import { getDistricts, getWards } from '@/lib/utils/address';
import { EmployeeSchema } from '@/yup-schema/employee';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { omit } from 'lodash';
import { ReactNode, useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';
import { useToggle } from 'usehooks-ts';

interface IModalThemKhachHang<T> extends Omit<IModalProps<T>, 'children'> {
	isEdit?: boolean;
}

const ModalThemKhachHang = (props: IModalThemKhachHang<Partial<ICustomer>>) => {
	const { data, onRefresh, isEdit = false, ...rest } = props;
	const queryClient = useQueryClient();
	const provinceData: IProvince[] = queryClient.getQueryData('provinces') ?? [];
	const [fetching, , setFetching] = useToggle();
	const [districts, setDistricts] = useState<IDistrict[]>([]);
	const [wards, setWards] = useState<IWard[]>([]);

	const { mutate, isLoading } = useMutation({
		mutationFn: !isEdit ? CustomerServices.create : CustomerServices.update,
		onSuccess: () => {
			toast.success(`${!isEdit ? 'Thêm' : 'Cập nhật'} khách hàng thành công`);
			onRefresh?.();
			rest.onClose();
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
	});

	const { setValue, handleSubmit, control, register, watch, reset } = useForm<
		Partial<ICustomer>
	>({
		defaultValues: {
			gender: 'NAM',
		},
		resolver: yupResolver(EmployeeSchema) as any,
	});

	useEffect(() => {
		if (!rest.open) {
			reset();
		} else {
			if (isEdit) {
				const initialValue = omit(data, ['isActive']);
				reset({
					...initialValue,
				});
				if (initialValue.idDistrict) {
					handleGetWards(initialValue.idDistrict);
				}
				if (initialValue.idProvince) {
					handleGetDistricts(initialValue.idProvince);
				}
			}
		}
	}, [rest.open]);

	const handleGetDistricts = async (id: string) => {
		setFetching(true);
		try {
			const districts = await getDistricts(id);
			setDistricts(districts.data);
		} catch (error) {
		} finally {
			setFetching(false);
		}
	};

	const handleGetWards = async (id: string) => {
		setFetching(true);
		try {
			const wards = await getWards(id);
			setWards(wards.data);
		} catch (error) {
		} finally {
			setFetching(false);
		}
	};

	const handleSuccess: SubmitHandler<Partial<ICustomer>> = (values) => {
		const payload = omit(values, ['district', 'province', 'ward']);
		mutate(payload);
	};

	const handleError: SubmitErrorHandler<Partial<ICustomer>> = (errors) => {
		const keys = Object.keys(errors) as (keyof ICustomer)[];
		toast.error(errors[keys[0]]?.message as ReactNode);
	};

	return (
		<Modal {...rest} loading={isLoading}>
			<form
				className="space-y-4"
				onSubmit={handleSubmit(handleSuccess, handleError)}
			>
				<div>
					<Label required>Tên khách hàng</Label>
					<Input {...register('fullName')} placeholder="tên khách hàng" />
				</div>
				<div className="flex items-center gap-4">
					<ReactSelect
						labelProps={{ required: true }}
						containerClass="min-w-[100px]"
						control={control}
						name="gender"
						title="Giới tính"
						options={generateOptions(GenderIndex)}
						placeholder="giới tính"
					/>

					<div className="flex-1">
						<Label>Fax</Label>
						<Input {...register('fax')} placeholder="+1 (555) 123-4567" />
					</div>
				</div>
				<div>
					<Label>Địa chỉ</Label>
					<Input {...register('address')} placeholder="địa chỉ" />
				</div>

				<ReactSelect
					name="idProvince"
					control={control}
					title="Tỉnh/ thành phố"
					placeholder="tỉnh/ thành phố"
					options={provinceData?.map((p) => ({
						value: p.id,
						label: p.name,
					}))}
					onChange={(p: any) => {
						setValue('idWard', null);
						setValue('idDistrict', null);
						handleGetDistricts(p.value);
					}}
				/>
				<div className="flex items-center gap-4">
					<div className="flex-1">
						<ReactSelect
							name="idDistrict"
							control={control}
							isLoading={fetching}
							title="Quận/ huyện"
							placeholder="quận/ huyện"
							options={
								watch('idProvince')
									? districts?.map((p) => ({
											value: p.id,
											label: p.name,
									  }))
									: []
							}
							onChange={(p: any) => {
								setValue('idWard', null);
								handleGetWards(p.value);
							}}
						/>
					</div>
					<div className="flex-1">
						<ReactSelect
							name="idWard"
							isLoading={fetching}
							control={control}
							title="Xã/ phường/ thị trấn"
							placeholder="xã/ phường/ thị trấn"
							options={
								watch('idDistrict')
									? wards?.map((p) => ({
											value: p.id,
											label: p.name,
									  }))
									: []
							}
						/>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex-1">
						<Label>Email</Label>
						<Input {...register('email')} placeholder="email" />
					</div>
					<div className="flex-1">
						<Label required>Số điện thoại</Label>
						<Input {...register('phone')} placeholder="số điện thoại" />
					</div>
				</div>

				<div>
					<Label>CMND/ CCCD</Label>
					<Input {...register('identityNumber')} placeholder="cmnd/ cccc" />
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

export default ModalThemKhachHang;
