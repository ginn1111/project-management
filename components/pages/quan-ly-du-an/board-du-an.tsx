'use client';

import IconSettings from '@/components/Icon/IconSettings';
import IconSquareCheck from '@/components/Icon/IconSquareCheck';
import IconXSquare from '@/components/Icon/IconXSquare';
import ModalTaoDauViec from '@/components/layout/quan-ly-du-an/modal-tool-bar/modal-tao-dau-viec';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColorStatusDauViec } from '@/constants/theme';
import useModal from '@/hooks/useModal';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import BoardDuAnItem from './board-du-an-item';
import ModalGiaoViec from './modal-du-an/modal-giao-viec';
import ModalLichSu from './modal-du-an/modal-lich-su';
import ModalPhanQuyen from './modal-du-an/modal-phan-quyen';
import ModalTaoCongViec from './modal-du-an/modal-tao-cong-viec';
import ModalChiTietDauViec from './modal-du-an/model-chi-tiet-dau-viec';
import ModalDanhGia from './nhan-vien-du-an/modal/modal-danh-gia';

const BoardDuAn = (props: IWorkProject) => {
	const router = useRouter();
	const { work, worksOfEmployee } = props;
	const {
		modal: modalState,
		handleCloseModal,
		handleOpenModal,
	} = useModal({
		modalCS: { open: false, data: {} },
		modalLS: { open: false },
		modalPQ: { open: false },
		modalTCV: { open: false },
		modalDV: { open: false },
		modalGV: { open: false },
		modalDG: { open: false },
	});

	const statisticTask = useMemo(() => {
		const tasksOfWork = props.worksOfEmployee.flatMap(
			(work) => work.tasksOfWork
		);
		const tasksDone = tasksOfWork.reduce(
			(acc, task) => acc + Number(task?.finishDate ?? 0),
			0
		);
		return {
			tasksDone,
			taskIP: tasksOfWork?.length - tasksDone,
		};
	}, [JSON.stringify(props.worksOfEmployee)]);

	return (
		<div className="rounded-sm px-2 pb-2 flex-shrink-0 min-w-[500px] w-min">
			<div className="text-primary px-4 py-2 rounded-t-md flex items-center shadow-[0_-5px_15px_-10px] shadow-primary2/50 flex-wrap max-w-full gap-2">
				<p className="text-xl font-bold max-w-full word-wrap-wrap mr-1">
					{work?.name}
				</p>
				<div
					className={cn(
						'rounded-md shrink-0 px-2 py-1 text-[12px] ml-auto uppercase font-medium',
						ColorStatusDauViec[
							(() => {
								const rd = Math.floor(Math.random());
								return rd > 0.6
									? 'success'
									: rd > 0.3
									? 'inprogress'
									: 'failed';
							})()
						]
					)}
				>
					Đang thực hiện
				</div>

				<div className="ml-2">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="outline" size="icon">
								<IconSettings className="w-5 h-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => handleOpenModal('modalCS', { data: props })}
							>
								Chỉnh sửa
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleOpenModal('modalDV')}>
								Chi tiết
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleOpenModal('modalTCV')}>
								Tạo công việc
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleOpenModal('modalGV')}>
								Giao việc
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleOpenModal('modalPQ')}>
								Phân quyền
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleOpenModal('modalDG')}>
								Đánh giá
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleOpenModal('modalLS')}>
								Lịch sử
							</DropdownMenuItem>
						</DropdownMenuContent>
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
			<ul className="max-w-[500px] w-max-content p-4 rounded-b-md space-y-3 bg-primary2-light overflow-y-auto h-max">
				{worksOfEmployee?.length ? (
					worksOfEmployee?.map((worksOfEmployee) => {
						return (
							<li key={worksOfEmployee.id} className="space-y-3">
								{worksOfEmployee.tasksOfWork?.map((taskOfWork) => (
									<BoardDuAnItem key={taskOfWork.idTask} {...taskOfWork} />
								))}
							</li>
						);
					})
				) : (
					<p className="text-center text-mutated-foreground">
						Không có công việc nào được tạo
					</p>
				)}
			</ul>
			<ModalChiTietDauViec
				open={modalState.modalDV.open}
				onClose={() => handleCloseModal('modalDV')}
				data={props}
				title="Khảo sát dự án Khảo sát dự án Khảo sát dự án"
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
				data={props}
				onClose={() => handleCloseModal('modalTCV')}
				onRefresh={() => router.refresh()}
			/>
			<ModalPhanQuyen
				onRefresh={() => router.refresh()}
				open={modalState.modalPQ.open}
				title="Phân quyền"
				data={{}}
				onClose={() => handleCloseModal('modalPQ')}
			/>
			<ModalLichSu
				open={modalState.modalLS.open}
				title="Lịch sử"
				data={{}}
				onClose={() => handleCloseModal('modalLS')}
			/>
			<ModalTaoDauViec
				open={modalState.modalCS.open}
				data={modalState.modalCS.data}
				onClose={() => handleCloseModal('modalCS')}
				title="Chỉnh sửa đầu việc"
				onRefresh={() => router.refresh()}
				isEdit
			/>
			<ModalDanhGia
				open={modalState.modalDG.open}
				data={{}}
				onClose={() => handleCloseModal('modalDG')}
				title="Đánh giá đầu việc"
			/>
		</div>
	);
};
export default BoardDuAn;
