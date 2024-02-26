import { Button } from '@/components/ui/button';
import Modal, { IModalProps } from '@/components/ui/modal';
import ReactSelect from '@/components/ui/react-select';
import { QueryKeys } from '@/constants/query-key';
import { UtilsServices, WorkProjectServices } from '@/lib';
import { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const ModalDanhGia = (props: Omit<IModalProps<IWorkProject>, 'children'>) => {
	const { data, ...rest } = props;
	const form = useForm();
	const { id } = useParams();

	const { data: rankEvaluationWorkData, isFetching } = useQuery<
		AxiosResponse<{ rankEvaluation: IRankEvaluationWork[] }>
	>({
		queryKey: QueryKeys.getRankEvaluationWork(),
		queryFn: UtilsServices.getRankEvaluationWork,
		enabled: !!rest.open,
		onError: (error) => {
			toast.error((error as AxiosError).response?.data as string);
		},
	});

	const { mutate: evaluate, isLoading } = useMutation({
		mutationFn: WorkProjectServices.evaluation,
		onSuccess: () => {
			toast.success('Đánh giá thành công');
			rest?.onRefresh?.();
		},
		onError: (error: AxiosError) => {
			toast.error(error?.response?.data as string);
		},
		onSettled: () => {
			rest?.onClose?.();
		},
	});

	const handleEvaluate = () => {
		evaluate({
			idWorkProject: data?.id!,
			idEvaluation: form.getValues('idRank'),
			idProject: id as string,
		});
	};

	return (
		<Modal {...rest} loading={isLoading}>
			<ReactSelect
				isLoading={isFetching}
				control={form.control}
				name="idRank"
				title="Đánh giá đầu việc"
				placeholder="mức độ"
				options={
					rankEvaluationWorkData?.data?.rankEvaluation?.map(({ id, name }) => ({
						value: id,
						label: name,
					})) ?? []
				}
			/>

			<div className="flex items-center justify-end gap-4 mt-4">
				<Button onClick={rest?.onClose} variant="outline">
					Đóng
				</Button>
				<Button onClick={handleEvaluate}>Xác nhận</Button>
			</div>
		</Modal>
	);
};

export default ModalDanhGia;
