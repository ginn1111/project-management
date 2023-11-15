'use client';

import IconSettings from '@/components/Icon/IconSettings';
import IconSquareCheck from '@/components/Icon/IconSquareCheck';
import IconXSquare from '@/components/Icon/IconXSquare';
import ModalTaoDauViec from '@/components/layout/quan-ly-du-an/modal-tool-bar/modal-tao-dau-viec';
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
import { WorkProjectServices } from '@/lib';
import { cn } from '@/lib/utils';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { AlertCircle, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import BoardDuAnItem from './board-du-an-item';
import ModalGiaoViec from './modal-du-an/modal-giao-viec';
import ModalLichSu from './modal-du-an/modal-lich-su';
import ModalPhanQuyen from './modal-du-an/modal-phan-quyen';
import ModalTaoCongViec from './modal-du-an/modal-tao-cong-viec';
import ModalChiTietDauViec from './modal-du-an/model-chi-tiet-dau-viec';
import ModalDanhGia from './nhan-vien-du-an/modal/modal-danh-gia';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@radix-ui/react-collapsible';

const BoardDuAn = (props: IWorkProject & { isHead: boolean }) => {
	const router = useRouter();
	const { isHead, work, worksOfEmployee, startDate, finishDate, finishDateET } =
		props;
	const dates = {
		startDateJs: dayjs(startDate),
		endDateJs: dayjs(finishDate ?? finishDateET),
	};
	const {
		modal: modalState,
		handleCloseModal,
		handleOpenModal,
	} = useModal({
		modalCS: { open: false, data: {} },
		modalLS: { open: false },
		modalPQ: { open: false, data: {} },
		modalTCV: { open: false },
		modalDV: { open: false },
		modalGV: { open: false },
		modalDone: { open: false },
		modalDG: { open: false },
	});

	const { mutate: doneWork, isLoading } = useMutation({
		mutationFn: WorkProjectServices.done,
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
		onSuccess: () => {
			toast.success('Đã đánh dấu đầu việc là hoàn thành');
			router.refresh();
		},
		onSettled: () => {
			handleCloseModal('modalDone');
		},
	});
	const isExpired =
		(!props?.finishDate && dayjs(props?.finishDateET).isBefore(dayjs(), 'd')) ||
		(props?.finishDate &&
			dayjs(props.finishDateET).isBefore(props?.finishDate, 'd'));

	const isDone = !!props.finishDate;

	let dropdownItems = [
		<DropdownMenuItem key="detail" onClick={() => handleOpenModal('modalDV')}>
			Chi tiết
		</DropdownMenuItem>,

		<DropdownMenuItem key="history" onClick={() => handleOpenModal('modalLS')}>
			Lịch sử
		</DropdownMenuItem>,
	];

	if (!isDone) {
		dropdownItems.push(
			<DropdownMenuItem
				key="create"
				onClick={() => handleOpenModal('modalTCV')}
			>
				Tạo công việc
			</DropdownMenuItem>
		);
		if (isHead) {
			dropdownItems.push(
				<DropdownMenuItem
					key="author"
					onClick={() => handleOpenModal('modalPQ')}
				>
					Phân quyền
				</DropdownMenuItem>,
				<DropdownMenuItem
					key="update"
					onClick={() => handleOpenModal('modalCS')}
				>
					Chỉnh sửa
				</DropdownMenuItem>,

				<DropdownMenuItem
					key="assign"
					onClick={() => handleOpenModal('modalGV')}
				>
					Giao việc
				</DropdownMenuItem>,
				<DropdownMenuItem
					key="done"
					onClick={() => handleOpenModal('modalDone')}
				>
					Hoàn thành
				</DropdownMenuItem>
			);
		}
	}
	if (!props.workEvaluation?.length && isDone) {
		dropdownItems.push(
			<DropdownMenuItem
				key="evaluate"
				onClick={() => handleOpenModal('modalDG')}
			>
				Đánh giá
			</DropdownMenuItem>
		);
	}

	const statisticTask = useMemo(() => {
		const tasksOfWork = props.worksOfEmployee.flatMap(
			(work) => work.tasksOfWork
		);
		const tasksDone = tasksOfWork.reduce(
			(acc, task) => acc + Number(!!task?.finishDate ?? 0),
			0
		);
		return {
			tasksDone,
			taskIP: tasksOfWork?.length - tasksDone,
		};
	}, [JSON.stringify(props.worksOfEmployee)]);

	return (
		<div className="rounded-sm px-2 pb-2 flex-shrink-0 min-w-[500px] w-min">
			<div className="text-primary px-4 py-2 rounded-t-md shadow-[0_-5px_15px_-10px] shadow-primary2/50 max-w-full">
				<div className="flex items-center justify-between">
					{props.workEvaluation?.[0]?.rankWorkEvaluation?.name ? (
						<p className="bg-primary2-light text-primary2 px-2 py-1 rounded-sm">
							{props.workEvaluation?.[0]?.rankWorkEvaluation?.name}
						</p>
					) : null}
					<p className="text-end text-muted-foreground text-[12px] font-medium mb-2">
						{dates.startDateJs.format('ddd DD/MM/YYYY')} <span> - </span>
						{dates.endDateJs.format('ddd DD/MM/YYYY')}
					</p>
				</div>
				<div className="flex items-center flex-wrap max-w-full gap-2">
					<p className="text-xl font-bold max-w-full word-wrap-wrap mr-1">
						{work?.name}
					</p>
					<div
						className={cn(
							'uppercase badge bg-primary/10 py-1.5 bg-primary2-light text-primary2 ml-auto',
							{
								['text-success bg-success-light']: isDone,
								['text-danger bg-danger-light']: isExpired,
							}
						)}
					>
						{isDone ? 'Hoàn thành' : isExpired ? '' : 'Đang thực hiện'}
						{isExpired && isDone ? ' - quá hạn' : isExpired ? 'Quá hạn' : ''}
					</div>
					<div className="ml-2">
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button variant="outline" size="icon">
									<IconSettings className="w-5 h-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>{dropdownItems}</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="flex gap-4 items-center w-full">
						<div className="flex items-center rounded-sm gap-1">
							<IconSquareCheck className="w-4 h-4 text-success" />
							<div className="text-xs">{statisticTask.tasksDone} Tasks</div>
						</div>

						<div className="flex items-center rounded-sm gap-1">
							<IconXSquare className="w-4 h-4 text-danger" />
							<div className="text-xs">{statisticTask.taskIP} Tasks</div>
						</div>
					</div>
				</div>
			</div>
			<ul className="max-w-[500px] w-max-content p-4 rounded-b-md space-y-3 bg-primary2-light overflow-y-auto h-max">
				{worksOfEmployee?.reduce(
					(acc, work) => acc + work.tasksOfWork?.length,
					0
				) ? (
					worksOfEmployee?.map((worksOfEmployee) => {
						const employee =
							worksOfEmployee.employee?.proposeProject.employeesOfDepartment
								?.employee?.fullName;
						const hasTask = worksOfEmployee.tasksOfWork?.length;

						return (
							<li key={worksOfEmployee.id}>
								<Collapsible defaultOpen>
									{hasTask ? (
										<CollapsibleTrigger className="bg-white text-primary px-4 py-2 rounded-sm flex items-center w-full justify-between mb-2">
											<p className="">
												{employee ?? 'Người tạo - người phụ trách dự án'}
											</p>
											<ChevronsUpDown className="w-4 h-4" />
										</CollapsibleTrigger>
									) : null}
									<CollapsibleContent>
										<div className="space-y-3 pl-3">
											{worksOfEmployee.tasksOfWork?.map((taskOfWork) => (
												<BoardDuAnItem
													key={taskOfWork.idTask}
													{...{
														...taskOfWork,
														finishDateETWork: props.finishDateET,
														startDateWork: props.startDate,
													}}
												/>
											))}
										</div>
									</CollapsibleContent>
								</Collapsible>
							</li>
						);
					})
				) : (
					<p className="text-center text-mutated-foreground">
						Không có công việc nào được tạo
					</p>
				)}
			</ul>
			<ModalConfirm
				loading={isLoading}
				onAccept={() => doneWork(props.id)}
				open={modalState.modalDone.open}
				onClose={() => handleCloseModal('modalDone')}
				message={
					<Alert className="border-warning text-warning">
						<AlertCircle color="#fbbf24" className="w-4 h-4" />
						<AlertTitle>Warning</AlertTitle>
						<AlertDescription>
							Sau khi hoàn thành, bạn sẽ không được chỉnh sửa!
						</AlertDescription>
					</Alert>
				}
				msgCTA="Xác nhận hoàn thành"
				title="Bạn muốn hoàn thành đầu việc này?"
			/>
			<ModalChiTietDauViec
				open={modalState.modalDV.open}
				onClose={() => handleCloseModal('modalDV')}
				data={props}
				title={props.work?.name}
			/>
			<ModalGiaoViec
				open={modalState.modalGV.open}
				title="Giao việc"
				data={props}
				onClose={() => handleCloseModal('modalGV')}
				onRefresh={() => router.refresh()}
			/>
			<ModalTaoCongViec
				open={modalState.modalTCV.open}
				title="Tạo công việc"
				data={{
					...props,
					finishDateETWork: props.finishDateET,
					startDateWork: props.startDate,
				}}
				onClose={() => handleCloseModal('modalTCV')}
				onRefresh={() => router.refresh()}
			/>
			<ModalPhanQuyen
				onRefresh={() => router.refresh()}
				open={modalState.modalPQ.open}
				title="Phân quyền"
				data={props}
				onClose={() => handleCloseModal('modalPQ')}
			/>
			<ModalLichSu
				open={modalState.modalLS.open}
				title="Lịch sử"
				data={props}
				onClose={() => handleCloseModal('modalLS')}
			/>
			<ModalTaoDauViec
				open={modalState.modalCS.open}
				data={props}
				onClose={() => handleCloseModal('modalCS')}
				title="Chỉnh sửa đầu việc"
				onRefresh={() => router.refresh()}
				isEdit
			/>
			<ModalDanhGia
				open={modalState.modalDG.open}
				data={props}
				onClose={() => handleCloseModal('modalDG')}
				title="Đánh giá đầu việc"
				onRefresh={() => router.refresh()}
			/>
		</div>
	);
};
export default BoardDuAn;
