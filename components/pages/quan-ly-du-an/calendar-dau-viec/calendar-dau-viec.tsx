'use client';

import ModalTaoDauViec from '@/components/layout/quan-ly-du-an/modal-tool-bar/modal-tao-dau-viec';
import LoadingInline from '@/components/ui/loading/loading-inline';
import { QueryKeys } from '@/constants/query-key';
import useModal from '@/hooks/useModal';
import { ProjectServices, WorkProjectServices } from '@/lib';
import { betweenTime, getMonth, hasTask, now } from '@/utils/helpers';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { AxiosError } from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const DUMMY = [
	{
		id: 1,
		title: 'All Day Event',
		start: now.getFullYear() + '-' + getMonth(now) + '-01T14:30:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-02T14:30:00',
		className: 'danger',
		description:
			'Aenean fermentum quam vel sapien rutrum cursus. Vestibulum imperdiet finibus odio, nec tincidunt felis facilisis eu.',
	},
	{
		id: 2,
		title: 'Site Visit',
		start: now.getFullYear() + '-' + getMonth(now) + '-07T19:30:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-08T14:30:00',
		className: 'primary',
		description:
			'Etiam a odio eget enim aliquet laoreet. Vivamus auctor nunc ultrices varius lobortis.',
	},
	{
		id: 3,
		title: 'Product Lunching Event',
		start: now.getFullYear() + '-' + getMonth(now) + '-17T14:30:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-18T14:30:00',
		className: 'info',
		description:
			'Proin et consectetur nibh. Mauris et mollis purus. Ut nec tincidunt lacus. Nam at rutrum justo, vitae egestas dolor.',
	},
	{
		id: 4,
		title: 'Meeting',
		start: now.getFullYear() + '-' + getMonth(now) + '-12T10:30:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-13T10:30:00',
		className: 'danger',
		description:
			'Mauris ut mauris aliquam, fringilla sapien et, dignissim nisl. Pellentesque ornare velit non mollis fringilla.',
	},
	{
		id: 5,
		title: 'Lunch',
		start: now.getFullYear() + '-' + getMonth(now) + '-12T15:00:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-13T15:00:00',
		className: 'info',
		description:
			'Integer fermentum bibendum elit in egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
	},
	{
		id: 6,
		title: 'Conference',
		start: now.getFullYear() + '-' + getMonth(now) + '-12T21:30:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-13T21:30:00',
		className: 'success',
		description:
			'Curabitur facilisis vel elit sed dapibus. Nunc sagittis ex nec ante facilisis, sed sodales purus rhoncus. Donec est sapien, porttitor et feugiat sed, eleifend quis sapien. Sed sit amet maximus dolor.',
	},
	{
		id: 7,
		title: 'Happy Hour',
		start: now.getFullYear() + '-' + getMonth(now) + '-12T05:30:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-13T05:30:00',
		className: 'info',
		description:
			' odio lectus, porttitor molestie scelerisque blandit, hendrerit sed ex. Aenean malesuada iaculis erat, vitae blandit nisl accumsan ut.',
	},
	{
		id: 8,
		title: 'Dinner',
		start: now.getFullYear() + '-' + getMonth(now) + '-12T20:00:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-13T20:00:00',
		className: 'danger',
		description:
			'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		id: 9,
		title: 'Birthday Party',
		start: now.getFullYear() + '-' + getMonth(now) + '-27T20:00:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-28T20:00:00',
		className: 'success',
		description:
			'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		id: 10,
		title: 'New Talent Event',
		start: now.getFullYear() + '-' + getMonth(now, 1) + '-24T08:12:14',
		end: now.getFullYear() + '-' + getMonth(now, 1) + '-27T22:20:20',
		className: 'danger',
		description:
			'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		id: 11,
		title: 'Other new',
		start: now.getFullYear() + '-' + getMonth(now, -1) + '-13T08:12:14',
		end: now.getFullYear() + '-' + getMonth(now, -1) + '-16T22:20:20',
		className: 'primary',
		description:
			'Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		id: 13,
		title: 'Upcoming Event',
		start: now.getFullYear() + '-' + getMonth(now, 1) + '-15T08:12:14',
		end: now.getFullYear() + '-' + getMonth(now, 1) + '-18T22:20:20',
		className: 'primary',
		description:
			'Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
];

interface ICalendarDauViec {
	data: IWorkProject[];
}

const CalendarDauViec = ({ data }: ICalendarDauViec) => {
	const router = useRouter();

	const { id } = useParams();

	const { mutate: updateWork, isLoading } = useMutation({
		mutationFn: WorkProjectServices.update,
		onSuccess: () => {
			toast.success('Cập nhật thành công');
			router.refresh();
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
	});

	const { data: projectData, isFetching } = useQuery({
		queryKey: QueryKeys.getDetailProject(id as string),
		queryFn: ({ queryKey }) => ProjectServices.getDetail(queryKey[1]),
	});

	const { modal, handleCloseModal, handleOpenModal } = useModal({
		modalDV: { open: false, isEdit: false, data: {} },
	});
	const fmtData = useMemo(() => {
		if (!data?.length) return [];

		return data?.map(({ id, finishDate, finishDateET, startDate, work }) => {
			const isExpired =
				dayjs(finishDateET).isBefore(dayjs(), 'day') ||
				(finishDate && dayjs(finishDateET).isBefore(finishDate, 'day'));

			const isDone = !!finishDate;

			return {
				id,
				start: startDate,
				end: finishDate ?? finishDateET,
				finish: finishDate,
				description: work?.note,
				title: work?.name,
				className:
					isDone && isExpired
						? 'bg-warning'
						: isDone
						? 'bg-success'
						: isExpired
						? 'bg-danger'
						: 'bg-primary2',
			};
		});
	}, [data]);

	return (
		<div className="calendar-wrapper mx-2 p-2 rounded-sm border relative">
			<div className="flex items-center gap-4 mb-2">
				<span className="rounded-md text-success bg-success-light px-2 py-1">
					Hoàn thành
				</span>
				<span className="rounded-md text-warning bg-warning-light px-2 py-1">
					Hoàn thành - quá hạn
				</span>
				<span className="rounded-md text-primary2 bg-primary2-light px-2 py-1">
					Đang thực hiện
				</span>
				<span className="rounded-md text-danger bg-danger-light px-2 py-1">
					Quá hạn
				</span>
			</div>
			{isLoading || isFetching ? <LoadingInline /> : null}
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				editable={true}
				selectable={true}
				eventDrop={(info) => {
					const eventData = info.event;

					const selectedWork: Partial<IWorkProject> =
						data.find((work) => eventData.id === work.id) ?? {};
					if (selectedWork.finishDate) {
						info.revert();
						return;
					}
					if (hasTask(selectedWork?.worksOfEmployee ?? [])) {
						info.revert();
						return;
					}
					const arrTimes: [Dayjs, Dayjs] = [
						dayjs(projectData?.data.startDate),
						dayjs(projectData?.data?.finishDateET),
					];
					const errorMsg1 = betweenTime(dayjs(eventData.start), arrTimes);
					const errorMsg2 = betweenTime(
						dayjs(eventData.end ?? eventData.start),
						arrTimes
					);

					if (errorMsg1 || errorMsg2) {
						info.revert();
						toast.error(errorMsg1 || errorMsg2);
						return;
					}

					updateWork({
						id: eventData.id,
						startDate: eventData.startStr,
						finishDateET: eventData.endStr || eventData.startStr,
						idProject: id as string,
					});
				}}
				eventClick={(event: any) => {
					const selectedWork: Partial<IWorkProject> =
						data.find((work) => event.event.id === work.id) ?? {};
					if (selectedWork.finishDate) return;

					handleOpenModal('modalDV', {
						isEdit: true,
						data: {
							...selectedWork,
						},
					});
				}}
				select={(info) => {
					const startDate = info.start;
					const endDate = dayjs(info.end).subtract(1, 'day');
					const arrTimes: [Dayjs, Dayjs] = [
						dayjs(projectData?.data.startDate),
						dayjs(projectData?.data?.finishDateET),
					];
					const errorMsg1 = betweenTime(dayjs(startDate), arrTimes);
					const errorMsg2 = betweenTime(dayjs(endDate), arrTimes);

					if (errorMsg1 || errorMsg2) {
						toast.error(errorMsg1 || errorMsg2);
						return;
					}
					handleOpenModal('modalDV', {
						isEdit: false,
						data: {
							startDate: startDate,
							finishDateET: endDate,
						},
					});
				}}
				events={fmtData}
			/>
			<ModalTaoDauViec
				open={modal.modalDV.open}
				data={modal.modalDV.data}
				onClose={() => handleCloseModal('modalDV')}
				title={`${modal.modalDV.isEdit ? 'Chỉnh sửa' : 'Thêm'} Đầu việc`}
				onRefresh={() => router.refresh()}
				isEdit={modal.modalDV.isEdit}
			/>
		</div>
	);
};

export default CalendarDauViec;
