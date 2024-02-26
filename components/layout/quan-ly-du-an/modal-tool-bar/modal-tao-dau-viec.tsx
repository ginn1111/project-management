import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Modal, { IModalProps } from '@/components/ui/modal';
import Label from '@/components/ui/my-label';
import { Textarea } from '@/components/ui/textarea';
import { QueryKeys } from '@/constants/query-key';
import { ProjectServices, WorkProjectServices } from '@/lib';
import { betweenTime, hasTask } from '@/utils/helpers';
import { WorkSchema } from '@/yup-schema/work';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

interface IModalTaoDauViec
	extends Omit<IModalProps<Partial<IWorkProject>>, 'children'> {
	isEdit?: boolean;
	initialValues?: Partial<IWorkProject>;
}

const ModalTaoDauViec = (props: IModalTaoDauViec) => {
	const { initialValues, isEdit, data, ...rest } = props;
	const { id } = useParams();

	const { data: projectData, isFetching } = useQuery({
		queryKey: QueryKeys.getDetailProject(id as string),
		queryFn: ({ queryKey }) => ProjectServices.getDetail(queryKey[1]),
	});

	const { mutate: addWork, isLoading } = useMutation({
		mutationFn: isEdit ? WorkProjectServices.update : WorkProjectServices.add,
		onSuccess: () => {
			toast.success(`${isEdit ? 'Cập nhật' : 'Thêm'} đầu việc thành công`);
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as ReactNode);
		},
		onSettled: () => {
			rest?.onClose?.();
			rest.onRefresh?.();
		},
	});

	const _hasTask = hasTask(data?.worksOfEmployee ?? []);

	const form = useForm({
		resolver: yupResolver(
			WorkSchema(isEdit, projectData?.data?.finishDateET)
		) as any,
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
			const { startDate, finishDateET } = data ?? {};
			form.reset({
				startDate: dayjs(startDate).format('YYYY-MM-DD'),
				finishDateET: dayjs(finishDateET).format('YYYY-MM-DD'),
			});
		}
	}, [rest.open]);

	const handleSuccess: SubmitHandler<Partial<IWorkProject>> = (values) => {
		const projectTimes: [Dayjs, Dayjs] = [
			dayjs(projectData?.data.startDate),
			dayjs(projectData?.data.finishDateET),
		];
		const errorMsg1 = betweenTime(dayjs(values.startDate), projectTimes);
		const errorMsg2 = betweenTime(
			dayjs(values.finishDateET),
			projectTimes,
			undefined,
			undefined,
			'hoàn thành dự kiến'
		);

		const startDateChange = !dayjs(data?.startDate).isSame(
			values.startDate,
			'd'
		);
		const endDateChange = !dayjs(data?.finishDateET).isSame(
			values.finishDateET,
			'd'
		);

		if (startDateChange && errorMsg1) {
			toast.error(errorMsg1);
			return;
		}

		if (endDateChange && errorMsg2) {
			toast.error(errorMsg2);

			return;
		}

		if (!dayjs(values.finishDateET).isBefore(projectTimes[1], 'day')) {
			toast.error('Ngày hoàn thành dự kiến đầu việc phải trước dự án');
			return;
		}

		const payload = {
			...values,
			id: data?.id,
			idProject: id as string,
		};

		if (isEdit && _hasTask) {
			delete payload.startDate;
			delete payload.finishDateET;
		}

		addWork(payload);
	};

	const handleError: SubmitErrorHandler<Partial<IWorkProject>> = (errors) => {
		const keys = Object.keys(errors) as (keyof IWorkProject)[];
		toast.error(errors[keys[0]]?.message as ReactNode);
	};

	return (
		<Modal {...rest} loading={isLoading || isFetching}>
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
					<Input
						{...form.register('startDate')}
						type="date"
						disabled={isEdit && _hasTask}
					/>
				</div>
				<div>
					<Label required>Ngày hoàn thành dự kiến</Label>
					<Input
						{...form.register('finishDateET')}
						type="date"
						disabled={isEdit && _hasTask}
					/>
				</div>
				<div>
					<Label>Mô tả</Label>
					<Textarea {...form.register('note')} placeholder="mô tả" rows={10} />
				</div>
				<div className="items-center justify-end gap-4 flex mt-2">
					<Button type="button" variant="outline" onClick={rest?.onClose}>
						Đóng
					</Button>
					<Button>Xác nhận</Button>
				</div>
			</form>
		</Modal>
	);
};

export default ModalTaoDauViec;
