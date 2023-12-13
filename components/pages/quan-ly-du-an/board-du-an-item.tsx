import IconClock from '@/components/Icon/IconClock';
import IconEllipsis from '@/components/Icon/IconEllipsis';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import useModal from '@/hooks/useModal';
import { WorkProjectServices } from '@/lib';
import { cn } from '@/lib/utils';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { AlertCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import ModalChiTietCongViec from './modal-du-an-item/modal-chi-tiet-cong-viec';
import ModalLichSu from './modal-du-an-item/modal-lich-su';
import ModalThemNguonLuc from './modal-du-an-item/modal-them-nguon-luc';
import ModalTaoCongViec from './modal-du-an/modal-tao-cong-viec';

dayjs.extend(duration);

const BoardDuAnItem = (props: ITaskOfWork) => {
	const { id } = useParams();
	const {
		note,
		startDate,
		finishDateET,
		finishDate,
		task,
		finishDateETWork,
		startDateWork,
	} = props;
	const { name } = task ?? {};
	const router = useRouter();
	const dates = {
		startDateJs: dayjs(startDate),
		endDateJs: dayjs(finishDate ?? finishDateET),
	};
	const {
		modal: modalState,
		handleCloseModal,
		handleOpenModal,
	} = useModal({
		modalCS: { open: false, task: {} },
		modalLS: { open: false },
		modalPQ: { open: false },
		modalCT: { open: false },
		modalDone: { open: false },
		modalNL: { open: false },
		modalCancel: { open: false },
	});

	const { mutate: cancelTask, isLoading: canceling } = useMutation({
		mutationFn: WorkProjectServices.cancelTask,
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
		onSuccess: () => {
			toast.success('Đã huỷ công việc');
		},
		onSettled: () => {
			handleCloseModal('modalCancel');
			router.refresh();
		},
	});

	const { mutate: doneTask, isLoading } = useMutation({
		mutationFn: WorkProjectServices.doneTask,
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
		onSuccess: () => {
			toast.success('Đã hoàn thành công việc');
		},
		onSettled: () => {
			handleCloseModal('modalDone');
			router.refresh();
		},
	});

	const duration = dayjs.duration(dayjs(finishDateET).diff(dayjs()));
	const _duration = {
		min: duration.minutes(),
		hour: duration.hours(),
		day: duration.days(),
		month: duration.months(),
		year: duration.years(),
	};

	const percentRef = useRef<HTMLInputElement | null>(null);

	const isExpired =
		(!props?.finishDate && dayjs(props?.finishDateET).isBefore(dayjs(), 'm')) ||
		(props?.finishDate &&
			dayjs(props.finishDateET).isBefore(props?.finishDate, 'm'));

	const isDone = !!props.finishDate;
	const isCancel = !props.task.isActive;

	let dropdownItems = [
		<DropdownMenuItem onClick={() => handleOpenModal('modalCT')} key="detail">
			Chi tiết
		</DropdownMenuItem>,
		<DropdownMenuItem onClick={() => handleOpenModal('modalLS')} key="history">
			Lịch sử
		</DropdownMenuItem>,
	];

	if (!isDone && !isCancel) {
		dropdownItems = dropdownItems.concat(
			<DropdownMenuItem key="done" onClick={() => handleOpenModal('modalDone')}>
				Hoàn thành
			</DropdownMenuItem>,
			<DropdownMenuItem
				key="update"
				onClick={() =>
					handleOpenModal('modalCS', {
						task: { ...props, finishDateETWork, startDateWork },
					})
				}
			>
				Chỉnh sửa
			</DropdownMenuItem>,
			<DropdownMenuItem
				key="resource"
				onClick={() => handleOpenModal('modalNL')}
			>
				Thêm nguồn lực
			</DropdownMenuItem>
		);
	}

	if (!isDone && !isCancel) {
		dropdownItems.push(
			<DropdownMenuItem
				onClick={() => handleOpenModal('modalCancel')}
				className="text-destructive hover:!text-destructive"
			>
				Huỷ
			</DropdownMenuItem>
		);
	}

	return (
		<div className="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light p-5 justify-start">
			<p className="text-end text-muted-foreground text-[12px] font-medium mb-2">
				{dates.startDateJs.format('ddd DD/MM/YYYY HH:mm')} <span> - </span>
				{dates.endDateJs.format('ddd DD/MM/YYYY HH:mm')}
			</p>
			<div className="flex justify-between mb-5 items-center">
				<h6 className="text-black font-semibold text-base dark:text-white-light">
					{name}
				</h6>
				<span
					className={cn(
						'uppercase badge bg-primary/10 py-1.5 bg-primary2-light text-primary2 flex-shrink-0',
						{
							['text-success bg-success-light']: isDone,
							['text-danger bg-danger-light']: isCancel,
							['text-warning bg-warning-light']: isExpired,
						}
					)}
				>
					{isDone
						? 'Hoàn thành'
						: isCancel
						? 'Huỷ'
						: isExpired
						? 'Quá hạn'
						: 'Đang thực hiện'}
					{isExpired && isDone ? ' - quá hạn' : ''}
				</span>
			</div>
			<p>{note}</p>
			<div className="flex items-center justify-between mt-3">
				{isExpired || props?.finishDate ? null : (
					<>
						{Object.values(_duration).reduce((acc, value) => acc + value, 0) ? (
							<div className="flex items-center rounded-full bg-danger/20 px-2 py-1 text-xs font-semibold text-danger w-max">
								<IconClock className="w-3 h-3 mr-1" />
								{_duration.year ? _duration.year + 'y' : null}{' '}
								{_duration.month ? _duration.month + 'm' : null}{' '}
								{_duration.day ? _duration.day + 'd' : null}{' '}
								{_duration.hour ? _duration.hour + 'h' : null}{' '}
								{_duration.min ? _duration.min + 'm' : null}{' '}
							</div>
						) : null}
					</>
				)}
				<DropdownMenu>
					<DropdownMenuTrigger className="ml-auto">
						<Button variant="outline" size="sm">
							<IconEllipsis />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>{dropdownItems}</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<ModalTaoCongViec
				isEdit
				data={modalState.modalCS.task}
				open={modalState.modalCS.open}
				title="Chỉnh sửa công việc"
				onClose={() => handleCloseModal('modalCS')}
				onRefresh={() => router.refresh()}
			/>
			<ModalChiTietCongViec
				title="just dummy"
				data={props}
				open={modalState.modalCT.open}
				onClose={() => handleCloseModal('modalCT')}
			/>
			<ModalLichSu
				data={props}
				open={modalState.modalLS.open}
				title="Lịch sử"
				onClose={() => handleCloseModal('modalLS')}
			/>

			<ModalConfirm
				key="cancel"
				loading={canceling}
				msgCTA="Xác nhận huỷ"
				title="Huỷ công việc"
				message="Bạn có chắc chắn muốn huỷ công việc"
				open={modalState.modalCancel.open}
				onAccept={() =>
					cancelTask({
						idProject: id as string,
						idTask: props.idTask,
						idTaskOfWork: props.id,
					})
				}
				onClose={() => handleCloseModal('modalCancel')}
			/>
			<ModalConfirm
				key="done"
				loading={isLoading}
				msgCTA="Xác nhận hoàn thành"
				title="Bạn chắc chắn muốn hoàn thành?"
				message={
					<div>
						<Alert className="border-warning text-warning">
							<AlertCircle color="#fbbf24" className="w-4 h-4" />
							<AlertTitle>Warning</AlertTitle>
							<AlertDescription>
								Sau khi hoàn thành, bạn sẽ không được chỉnh sửa!
							</AlertDescription>
						</Alert>
						<Input
							ref={percentRef}
							className="mt-3"
							placeholder="Mức độ hoàn thành 0 - 100"
							type="number"
						/>
					</div>
				}
				open={modalState.modalDone.open}
				onAccept={() => {
					const percentOfDone = parseFloat(percentRef.current?.value ?? '');
					if (!percentOfDone || percentOfDone > 100 || percentOfDone < 0) {
						toast.error('Mức độ hoàn thành không hợp lệ');
						return;
					}

					if (props.startDate && dayjs().isBefore(dayjs(props.startDate))) {
						toast.error(
							'Thời gian hoàn thành không thể nhỏ hơn thời gian bắt đầu!'
						);
						return;
					}
					doneTask({
						idTaskOfWOrk: props.id,
						percentOfDone,
						idProject: id as string,
					});
				}}
				onClose={() => handleCloseModal('modalDone')}
			/>
			<ModalThemNguonLuc
				idProject={id as string}
				data={props}
				open={modalState.modalNL.open}
				onClose={() => handleCloseModal('modalNL')}
				title="Thêm nguồn lực cho công việc"
			/>
		</div>
	);
};

export default BoardDuAnItem;
