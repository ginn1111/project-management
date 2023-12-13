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
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
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
import { WorkState } from '@/constants/general';
import { QueryKeys } from '@/constants/query-key';

const BoardDuAn = (props: IWorkProject & { isHead: boolean }) => {
	const router = useRouter();
	const params = useParams();

	const queryClient = useQueryClient();
	const { isHead, work, worksOfEmployee, startDate, finishDate, finishDateET } =
		props;
	const dates = {
		startDateJs: dayjs(startDate),
		endDateJs: dayjs(finishDateET),
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
		modalCanceled: { open: false },
		modalStart: { open: false },
	});

	// done work
	const { mutate: doneWork, isLoading } = useMutation({
		mutationFn: WorkProjectServices.done,
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
		onSuccess: () => {
			toast.success('Đã đánh dấu đầu việc là hoàn thành');
		},
		onSettled: () => {
			handleCloseModal('modalDone');
			router.refresh();
		},
	});

	// cancel work
	const { mutate: cancelWork, isLoading: canceling } = useMutation({
		mutationFn: WorkProjectServices.cancelWork,
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
		onSuccess: () => {
			toast.success('Huỷ đầu việc thành công');

			queryClient.refetchQueries(
				QueryKeys.getDetailProject(params.id as string)
			);
		},
		onSettled: () => {
			handleCloseModal('modalCanceled');
			router.refresh();
		},
	});
	// start work
	const { mutate: startWork, isLoading: starting } = useMutation({
		mutationFn: WorkProjectServices.startWork,
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
		onSuccess: () => {
			toast.success('Đầu việc đã được bắt đầu');
			queryClient.refetchQueries(
				QueryKeys.getDetailProject(params.id as string)
			);
		},
		onSettled: () => {
			handleCloseModal('modalStart');
			router.refresh();
		},
	});

	const isExpired =
		(!props?.finishDate && dayjs(props?.finishDateET).isBefore(dayjs(), 'd')) ||
		(props?.finishDate &&
			dayjs(props.finishDateET).isBefore(props?.finishDate, 'd'));

	const isDone = !!props.finishDate;
	const isPlaning = props.work?.state?.name === WorkState.Planing;
	const isProcessing = props?.work?.state?.name === WorkState.Processing;
	const isCanceled = props?.work?.state?.name === WorkState.Canceled;

	let dropdownItems = [
		<DropdownMenuItem key="detail" onClick={() => handleOpenModal('modalDV')}>
			Chi tiết
		</DropdownMenuItem>,

		<DropdownMenuItem key="history" onClick={() => handleOpenModal('modalLS')}>
			Lịch sử
		</DropdownMenuItem>,
	];

	if (isHead) {
		dropdownItems.push(
			<DropdownMenuItem key="author" onClick={() => handleOpenModal('modalPQ')}>
				Phân quyền
			</DropdownMenuItem>
		);
	}

	if (isHead && !isDone && !isCanceled) {
		dropdownItems.push(
			<DropdownMenuItem key="update" onClick={() => handleOpenModal('modalCS')}>
				Chỉnh sửa
			</DropdownMenuItem>,

			<DropdownMenuItem key="assign" onClick={() => handleOpenModal('modalGV')}>
				Giao việc
			</DropdownMenuItem>
		);
	}

	if (isProcessing) {
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
					key="done"
					onClick={() => handleOpenModal('modalDone')}
				>
					Hoàn thành
				</DropdownMenuItem>
			);
		}
	}

	if (!props.workEvaluation?.length && isDone && isHead) {
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
								['text-danger bg-waring-light']: isCanceled,
								['text-warning bg-warning-light']: isExpired && isDone,
							}
						)}
					>
						{isPlaning ? (
							'Lên kế hoạch'
						) : isCanceled ? (
							'Huỷ'
						) : (
							<>
								{isDone
									? 'Hoàn thành'
									: isExpired
									? 'Quá hạn'
									: isProcessing
									? 'Đang thực hiện'
									: ''}
								{isExpired && isDone ? ' - quá hạn' : ''}
							</>
						)}
					</div>
					{isPlaning && isHead ? (
						<div className="flex items-center justify-end gap-2 flex-1">
							<Button
								size="sm"
								className="text-[12px] h-[2rem] bg-primary2-light text-primary2 hover:text-primary2-light hover:bg-primary2"
								onClick={() => handleOpenModal('modalStart')}
							>
								Bắt đầu
							</Button>
							<Button
								size="sm"
								variant="destructive"
								className="text-[12px] h-[2rem]"
								onClick={() => handleOpenModal('modalCanceled')}
							>
								Huỷ
							</Button>
						</div>
					) : null}
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
							<li
								key={
									worksOfEmployee.idWorksProject +
									worksOfEmployee.idEmployee +
									worksOfEmployee.id
								}
							>
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
													key={taskOfWork.id}
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
				loading={starting}
				onAccept={() => startWork(props.id)}
				open={modalState.modalStart.open}
				onClose={() => handleCloseModal('modalStart')}
				message="Bắt đầu thực hiện đầu việc"
				msgCTA="Bắt đầu"
				variant="default"
				title="Bắt đầu đầu việc"
			/>
			<ModalConfirm
				loading={canceling}
				onAccept={() => cancelWork(props.id)}
				open={modalState.modalCanceled.open}
				onClose={() => handleCloseModal('modalCanceled')}
				message="Bạn có muốn huỷ đầu việc này"
				msgCTA="Xác nhận huỷ"
				title="Huỷ đầu việc"
			/>
			<ModalConfirm
				loading={isLoading}
				onAccept={() => {
					if (
						props.startDate &&
						dayjs().isBefore(dayjs(props.startDate), 'D')
					) {
						toast.error(
							'Thời gian hoàn thành không thể nhỏ hơn thời gian bắt đầu!'
						);
						return;
					}
					doneWork(props.id);
				}}
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
