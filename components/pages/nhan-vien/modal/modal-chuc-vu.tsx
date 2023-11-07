import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Modal, { IModalProps } from '@/components/ui/modal';
import ReactSelect from '@/components/ui/react-select';
import { PositionServices } from '@/lib';
import { AxiosError } from 'axios';
import { isNull } from 'lodash';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const ModalChucVu = (
	props: Omit<IModalProps<Partial<IEmployee>>, 'children'>
) => {
	const { data, onRefresh, ...rest } = props;
	const { control, setValue, watch, reset, getValues, handleSubmit } =
		useForm();

	const { mutate, isLoading } = useMutation({
		mutationFn: ({
			idPosition,
			idEmployee,
		}: {
			idPosition: string;
			idEmployee: string;
		}) => PositionServices.addToEmployee(idPosition, idEmployee, {}),
		onSuccess: () => {
			toast.success('Thay đổi chức vụ thành công');
			onRefresh?.();
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
		onSettled: () => {
			rest.onClose();
		},
	});

	const {
		data: positionData,
		isFetching,
		refetch,
	} = useQuery({
		queryFn: () => PositionServices.getList(''),
		queryKey: ['position/get-list'],
		enabled: false,
	});

	const nowPosition = data?.positions?.find((position) =>
		isNull(position.endDate)
	);

	useEffect(() => {
		if (rest.open) {
			refetch();
			setValue('nowPosition', nowPosition?.position?.id);
		} else {
			reset();
		}
	}, [rest.open]);

	const handleSuccess = () => {
		if (!data?.id) {
			toast.error('Mã nhân viên không tồn tại!');
			return;
		}
		const idPosition = getValues('newPosition');
		const idEmployee = data?.id!;

		mutate({ idPosition, idEmployee });
	};

	return (
		<Modal {...rest} loading={isFetching || isLoading}>
			<form
				className="flex flex-col gap-4 min-h-[300px]"
				onSubmit={handleSubmit(handleSuccess)}
			>
				{nowPosition ? (
					<ReactSelect
						control={control}
						labelProps={{ required: true }}
						title="Chức vụ hiện tại"
						name="nowPosition"
						options={[
							{
								value: nowPosition?.position.id,
								label: nowPosition?.position.name,
							},
						]}
					/>
				) : (
					<Alert className="text-info border-info bg-info-light">
						<AlertTitle className="flex items-center gap-2">
							<AlertCircle className="w-4 h-4" />
							Info
						</AlertTitle>
						<AlertDescription>Nhân viên chưa có chức vụ!</AlertDescription>
					</Alert>
				)}
				<ReactSelect
					control={control}
					labelProps={{ required: true }}
					title={data?.departments?.length ? 'Chức vụ mới' : 'Chức vụ'}
					name="newPosition"
					options={
						positionData?.data?.positions
							?.filter(({ id }: { id: string }) => watch('nowPosition') !== id)
							?.map(({ id, name }: IDepartment) => ({
								label: name,
								value: id,
							})) ?? []
					}
					placeholder="Chức vụ mới"
				/>

				<div className="flex items-center justify-end gap-4 mt-auto">
					<Button type="button" onClick={rest.onClose} variant="outline">
						Đóng
					</Button>
					<Button>Xác nhận</Button>
				</div>
			</form>
		</Modal>
	);
};

export default ModalChucVu;
