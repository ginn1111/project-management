import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getEmployeeFromProposePj } from '@/utils/helpers';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'usehooks-ts';

const ModalChiTietDauViec = (
	props: Omit<IModalProps<IWorkProject>, 'children'>
) => {
	const [show, , setShow] = useToggle();
	const { data, ...rest } = props;

	const form = useForm();

	useEffect(() => {
		if (rest.open) {
			const { startDate, finishDateET } = data ?? {};
			const startDateJs = dayjs(startDate);
			const finishDateJs = dayjs(finishDateET);
			form.reset({
				startDate: startDateJs.isValid()
					? startDateJs.format('YYYY-MM-DD')
					: undefined,
				finishDateET: finishDateJs.isValid()
					? finishDateJs.format('YYYY-MM-DD')
					: undefined,
			});
		}
	}, [rest.open]);

	return (
		<>
			<Modal {...rest} title={data?.work?.name}>
				<div className="flex items-center gap-4">
					<div className="flex-1">
						<Label>Ngày bắt đầu</Label>
						<Input {...form.register('startDate')} type="date" disabled />
					</div>
					<div className="flex-1">
						<Label>Ngày hoàn thành</Label>
						<Input {...form.register('finishDateET')} type="date" disabled />
					</div>
				</div>
				<div>
					<Label>Nhân viên thuộc đầu việc</Label>
					{data?.worksOfEmployee?.length ? (
						<div>
							<ScrollArea className="h-[200px] w-full rounded-md border p-2">
								{data?.worksOfEmployee?.map((workOfEmp) => (
									<div
										key={workOfEmp.id}
										className="flex items-center justify-between hover:bg-muted p-2 rounded-md cursor-pointer"
									>
										<span className="text-sm">
											{
												getEmployeeFromProposePj(
													workOfEmp.employee?.proposeProject
												).fullName
											}
											<span> - </span>
											{
												workOfEmp.employee?.proposeProject.employeesOfDepartment
													?.department?.name
											}
										</span>
									</div>
								))}
							</ScrollArea>
						</div>
					) : (
						<p className="text-danger text-sm">
							Chưa có nhân viên được giao việc
						</p>
					)}
				</div>
				{data?.note ? (
					<div className="ring-2 ring-muted rounded-md mb-5 px-4 py-2">
						<Label>Mô tả</Label>
						<p className="text-sm">{data.note}</p>
					</div>
				) : null}

				<div className="mt-2 flex items-center justify-end">
					<Button variant="outline" onClick={rest.onClose}>
						Đóng
					</Button>
				</div>
			</Modal>
			<ModalConfirm
				onClose={() => setShow(false)}
				onAccept={() => alert('delete')}
				open={show}
			/>
		</>
	);
};

export default ModalChiTietDauViec;
