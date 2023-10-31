'use client';

import { now, getMonth } from '@/utils/helpers';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { isEmpty } from 'lodash';
import { useMemo, useState } from 'react';
import ModalChinhSuaDauViec from '../modal-du-an/modal-chinh-sua-dau-viec';
import dayjs from 'dayjs';

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

type EventType = Partial<(typeof DUMMY)[0]>;

interface ICalendarDauViec {
	data: IWorkProject[];
}

const CalendarDauViec = ({ data }: ICalendarDauViec) => {
	console.log(data);
	const [editEvent, setEditEvent] = useState<EventType>({});
	const fmtData = useMemo(() => {
		if (!data?.length) return [];
		return data?.map(
			({ id, note, finishDate, finishDateET, startDate, work }, idx) => ({
				id: idx + 1,
				start: startDate,
				end: finishDate ?? finishDateET,
				description: note,
				title: work?.name,
				className: finishDate
					? 'success'
					: dayjs(finishDateET).isBefore(new Date())
					? 'danger'
					: 'primary',
			})
		);
	}, [data]);

	return (
		<div className="calendar-wrapper mx-2 p-2 rounded-sm border">
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				headerToolbar={{
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay',
				}}
				editable={true}
				dayMaxEvents={true}
				selectable={true}
				droppable={true}
				eventDrop={() => console.log('drop')}
				eventClick={(event: any) => {
					setEditEvent(event.event);
				}}
				select={(event: any) => {
					console.log(event);
					setEditEvent(JSON.parse(JSON.stringify(event)));
				}}
				events={fmtData}
			/>
			<ModalChinhSuaDauViec<EventType>
				title="Chỉnh sửa đầu việc"
				data={editEvent}
				open={!isEmpty(editEvent)}
				onClose={() => setEditEvent({})}
			/>
		</div>
	);
};

export default CalendarDauViec;
