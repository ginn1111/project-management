import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';

const ModalChiTietCongViec = (
	props: Omit<IModalProps<ITaskOfWork>, 'children'>
) => {
	const { data, ...rest } = props;

	const isDone = !!data?.finishDate;

	const date = {
		startDateJs: dayjs(data?.startDate),
		finishDateJs: dayjs(data?.finishDate ?? data?.finishDateET),
	};

	return (
		<Modal
			{...rest}
			title={
				<div className="flex gap-2 items-center justify-between">
					<p>{data?.task.name}</p>
					{data?.percentOfDone ? (
						<p
							className={cn(
								'text-[15px] text-danger bg-danger-light mr-5 px-4 py-2 rounded-lg ring-danger',
								{
									['ring-warning text-warning bg-warning-light ring-1']:
										data?.percentOfDone >= 50,
									['ring-success text-success bg-success-light']:
										data?.percentOfDone >= 75,
								}
							)}
						>
							{data?.percentOfDone}
						</p>
					) : null}
				</div>
			}
		>
			<div className="space-y-4">
				<div className="flex items-center gap-4">
					<div className="flex-1">
						<Label>Ngày bắt đầu</Label>
						<Input
							type="datetime-local"
							disabled
							defaultValue={
								date.startDateJs.isValid()
									? date.startDateJs.format('YYYY-MM-DDTHH:mm')
									: undefined
							}
						/>
					</div>
					<div className="flex-1">
						<Label>Ngày hoàn thành {isDone ? '' : 'dự kiến'}</Label>
						<Input
							type="datetime-local"
							disabled
							defaultValue={
								date.finishDateJs.isValid()
									? date.finishDateJs.format('YYYY-MM-DDTHH:mm')
									: undefined
							}
						/>
					</div>
				</div>
				{data?.note ? (
					<div className="ring-2 ring-muted rounded-md mb-5 px-4 py-2">
						<Label>Mô tả</Label>
						<p className="text-sm">{data.note}</p>
					</div>
				) : null}
				<div>
					<Label>Nguồn lực sử dụng</Label>
					{data?.task?.resourceOfTasks?.length ? (
						<ScrollArea className="px-4 py-2 border rounded-md h-[100px]">
							{data?.task?.resourceOfTasks.map((resourceOfTask, idx) => (
								<div
									key={idx}
									className="flex items-center gap-4 justify-between text-sm"
								>
									<p>{resourceOfTask.resource?.resource?.name}</p>
									<span>{resourceOfTask.amount}</span>
								</div>
							))}
						</ScrollArea>
					) : (
						<p className="text-danger text-sm">
							Công việc chưa sử dụng nguồn lực
						</p>
					)}
				</div>
			</div>

			<div className="mt-2 flex items-center justify-between">
				<Button className="ml-auto" variant="outline" onClick={rest.onClose}>
					Đóng
				</Button>
			</div>
		</Modal>
	);
};

export default ModalChiTietCongViec;
