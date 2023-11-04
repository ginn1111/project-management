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
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import useModal from '@/hooks/useModal';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ModalChiTietCongViec from './modal-du-an-item/modal-chi-tiet-cong-viec';
import ModalLichSu from './modal-du-an-item/modal-lich-su';
import ModalPhanQuyen from './modal-du-an-item/modal-phan-quyen';
import ModalThemNguonLuc from './modal-du-an-item/modal-them-nguon-luc';
import ModalTaoCongViec from './modal-du-an/modal-tao-cong-viec';

dayjs.extend(duration);

const BoardDuAnItem = (props: ITaskOfWork) => {
	const { note, finishDateET, task, finishDateETWork } = props;
	const { name } = task ?? {};
	const router = useRouter();
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
	});

	const duration = dayjs.duration(dayjs(finishDateET).diff(dayjs()));
	const _duration = {
		min: duration.minutes(),
		hour: duration.hours(),
		day: duration.days(),
		month: duration.months(),
		year: duration.years(),
	};

	const isExpired =
		dayjs(props?.finishDateET).isBefore(dayjs(), 'h') ||
		(props?.finishDate &&
			dayjs(props.finishDateET).isBefore(props?.finishDate, 'h'));
	const isDone = !!props.finishDate;

	let dropdownItems = [
		<DropdownMenuItem onClick={() => handleOpenModal('modalCT')} key="detail">
			Chi tiết
		</DropdownMenuItem>,
		<DropdownMenuItem onClick={() => handleOpenModal('modalLS')} key="history">
			Lịch sử
		</DropdownMenuItem>,
	];

	if (!isDone) {
		dropdownItems = dropdownItems.concat(
			<DropdownMenuItem onClick={() => handleOpenModal('modalDone')}>
				Hoàn thành
			</DropdownMenuItem>,
			<DropdownMenuItem
				onClick={() =>
					handleOpenModal('modalCS', { task: { ...props, finishDateETWork } })
				}
			>
				Chỉnh sửa
			</DropdownMenuItem>,
			<DropdownMenuItem onClick={() => handleOpenModal('modalPQ')}>
				Phân quyền
			</DropdownMenuItem>,
			<DropdownMenuItem onClick={() => handleOpenModal('modalNL')}>
				Thêm nguồn lực
			</DropdownMenuItem>
		);
	}

	return (
		<li className="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light p-5 justify-start">
			<div className="flex justify-between mb-5 items-center">
				<h6 className="text-black font-semibold text-base dark:text-white-light">
					{name}
				</h6>
				<span
					className={cn(
						'uppercase badge bg-primary/10 py-1.5 bg-primary2-light text-primary2',
						{
							['text-success bg-success-light']: isDone,
							['text-danger bg-danger-light']: isExpired,
						}
					)}
				>
					{isDone ? 'Hoàn thành' : isExpired ? 'Quá hạn' : 'Đang thực hiện'}
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

			<ModalPhanQuyen
				data={{}}
				open={modalState.modalPQ.open}
				title="Phân quyền"
				onClose={() => handleCloseModal('modalPQ')}
			/>
			<ModalTaoCongViec
				isEdit
				data={modalState.modalCS.task}
				open={modalState.modalCS.open}
				title="Chỉnh sửa công việc"
				onClose={() => handleCloseModal('modalCS')}
				onRefresh={() => router.refresh()}
			/>
			<ModalChiTietCongViec
				data={props}
				open={modalState.modalCT.open}
				onClose={() => handleCloseModal('modalCT')}
				title={props.task.name}
			/>
			<ModalLichSu
				data={props}
				open={modalState.modalLS.open}
				title="Lịch sử"
				onClose={() => handleCloseModal('modalLS')}
			/>
			<ModalConfirm
				variant="default"
				msgCTA="Xác nhận hoàn thành"
				title="Bạn chắc chắn muốn hoàn thành?"
				message={
					<Alert className="border-warning text-warning">
						<AlertCircle color="#fbbf24" className="w-4 h-4" />
						<AlertTitle>Warning</AlertTitle>
						<AlertDescription>
							Sau khi hoàn thành, bạn sẽ không được chỉnh sửa!
						</AlertDescription>
					</Alert>
				}
				open={modalState.modalDone.open}
				onAccept={() => alert('Done task')}
				onClose={() => handleCloseModal('modalDone')}
			/>
			<ModalThemNguonLuc
				open={modalState.modalNL.open}
				onClose={() => handleCloseModal('modalNL')}
				title="Thêm nguồn lực cho công việc"
			/>
		</li>
	);
};

export default BoardDuAnItem;
