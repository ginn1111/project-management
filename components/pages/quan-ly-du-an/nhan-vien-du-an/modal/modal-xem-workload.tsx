import Modal, { IModalProps } from '@/components/ui/modal';
import { getMonth, now } from '@/utils/helpers';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

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

const ModalXemWorkLoad = <T,>(props: Omit<IModalProps<T>, 'children'>) => {
  const { ...rest } = props;
  return (
    <Modal {...rest}>
      <div className="calendar-wrapper mx-2 p-2 rounded-sm border min-w-[65vw] min-h-[60vh]">
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
          events={DUMMY}
        />
      </div>
    </Modal>
  );
};

export default ModalXemWorkLoad;
