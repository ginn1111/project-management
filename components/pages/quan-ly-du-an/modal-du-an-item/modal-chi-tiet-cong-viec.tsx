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

	const date = {
		startDateJs: dayjs(data?.startDate),
		finishDateJs: dayjs(data?.finishDateET),
	};

	return (
		<Modal {...rest} title={data?.task?.name}>
			<div className="space-y-4">
				<div className="flex items-center gap-4">
					<div className="flex-1">
						<Label>Ngày bắt đầu</Label>
						<Input
							type="date"
							disabled
							defaultValue={
								date.startDateJs.isValid()
									? date.startDateJs.format('YYYY-MM-DD')
									: undefined
							}
						/>
					</div>
					<div className="flex-1">
						<Label>Ngày hoàn thành dự kiến</Label>
						<Input
							type="date"
							disabled
							defaultValue={
								date.startDateJs.isValid()
									? date.startDateJs.format('YYYY-MM-DD')
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
						<ScrollArea className="px-4 py-2 border rounded-md h-[200px]">
							{Array(10)
								.fill(0)
								.map((_, idx) => (
									<div
										key={idx}
										className="flex items-center gap-4 justify-between text-sm"
									>
										<p>Tên nguồn lực</p>
										<span>Số lượng</span>
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
				<span
					className={cn(
						'uppercase badge bg-primary/10 py-1.5 bg-primary2-light text-primary2',
						{
							['text-success bg-success-light']: !!data?.finishDate,
							['text-danger bg-danger-light']: !!dayjs(
								data?.finishDateET
							).isBefore(dayjs()),
						}
					)}
				>
					{data?.finishDate ? 'Hoàn thành' : 'Đang thực hiện'}
					{dayjs(data?.finishDateET).isBefore(dayjs()) ? 'Quá hạn' : null}
				</span>
				<Button variant="outline" onClick={rest.onClose}>
					Đóng
				</Button>
			</div>
		</Modal>
	);
};

export default ModalChiTietCongViec;
