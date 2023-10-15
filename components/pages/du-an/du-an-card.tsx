import IconCalendar from '@/components/Icon/IconCalendar';
import IconDesign from '@/components/Icon/IconDesign';
import IconEditTwoTone from '@/components/Icon/IconEditTwoTone';
import IconEyeTwoTone from '@/components/Icon/IconEyeTwoTone';
import IconSendTwoTone from '@/components/Icon/IconSendTwoTone';
import { Label } from '@/components/ui/label';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Link from 'next/link';
import { useState } from 'react';
import ModalSuaDuAn from './modal/modal-sua-du-an';
import ModalThemNguonLuc from './modal/modal-them-nguon-luc';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
dayjs.extend(duration);

const end = new Date(2023, 11, 1);

const roleColors = [
  ['text-secondary2', 'bg-secondary2-light'],
  ['text-primary2', 'bg-primary2-light'],
  ['text-success', 'bg-success-light'],
  ['text-danger', 'bg-danger-light'],
  ['text-warning', 'bg-warning-light'],
  ['text-info', 'bg-info-light'],
];

const DuAnCard = () => {
  const [modal, setModal] = useState({
    modalNL: { open: false },
    modalCS: { open: false },
    modalCF: { open: false },
  });

  const handleOpenModal = (name: 'modalNL' | 'modalCS') =>
    setModal((old) => ({ ...old, [name]: { open: true } }));
  const handleCloseModal = (name: 'modalNL' | 'modalCS') =>
    setModal((old) => ({ ...old, [name]: { open: false } }));

  return (
    <div className="rounded-sm p-2 bg-gradient-from-tl bg-gradient-to-br from-accent to-primary2-light col-span-1 min-h-[200px] transition-all border-2 hover:border-ring border-transparent hover:from-primary2-light hover:to-accent">
      <div className="border-b border-primary pb-1 mb-1 flex items-start justify-between gap-4">
        <h2 className="text-xl font-medium ">Dự án</h2>
        <p className="border-primary bg-accent rounded-md text-primary border p-1 flex-shrink-0 flex items-center gap-2">
          <IconCalendar className="text-sm" />
          <span className="bg-primary rounded-sm text-accent px-1 text-[12px]">
            {dayjs
              .duration(
                dayjs(end).diff(new Date(2023, 10, 1), 'months'),
                'months'
              )
              .months()}{' '}
            tháng
          </span>
        </p>
      </div>
      <div className="flex items-center gap-4 justify-between">
        <Label className="text-md">Ngày bắt đầu</Label>
        <p>{dayjs().format('DD/MM/YYYY')}</p>
      </div>
      <div className="flex items-center gap-4 justify-between mb-2">
        <Label className="text-md">Ngày kết thúc</Label>
        <p>{dayjs().format('DD/MM/YYYY')}</p>
      </div>
      <div className="flex items-center gap-4 justify-between mb-2">
        <Label className="text-md">Khách hàng</Label>
        <p>Tên khách hàng</p>
      </div>
      <div>
        <Label className="text-md">Phòng ban</Label>
        <ul className="flex flex-wrap gap-2">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <li
                key={index}
                className={cn(
                  'px-3 py-1 rounded-full bg-primary2 text-accent flex-1 whitespace-nowrap text-center',
                  ...roleColors[Math.floor(Math.random() * roleColors.length)]
                )}
              >
                Kỹ thuật
              </li>
            ))}
        </ul>
      </div>
      <div className="flex items-center my-2 gap-2 justify-end cursor-pointer">
        <span
          className="group"
          role="button"
          onClick={() => handleOpenModal('modalCS')}
        >
          <IconEditTwoTone className="group-hover:text-warning " />
        </span>
        <span role="button" onClick={() => handleOpenModal('modalCF')}>
          <IconSendTwoTone />
        </span>
        <span
          className="group"
          role="button"
          onClick={() => handleOpenModal('modalNL')}
        >
          <IconDesign className="group-hover:text-destructive h-[20px] w-[20px]" />
        </span>
        <Link href="/du-an/1">
          <IconEyeTwoTone />
        </Link>
      </div>
      <ModalThemNguonLuc
        title="Thêm nguồn lực"
        open={modal.modalNL.open}
        data={{}}
        onClose={() => handleCloseModal('modalNL')}
      />
      <ModalSuaDuAn
        title="Sửa dự án"
        open={modal.modalCS.open}
        onClose={() => handleCloseModal('modalCS')}
      />
      <ModalConfirm
        open={modal.modalCF.open}
        title="Đề xuất tham gia dự án"
        message={
          <>
            <p className="text-md mb-2">
              Bạn có chắc chắn muốn đề xuất tham gia vào dự án này?
            </p>
            <Label>Lời nhắn</Label>
            <Textarea placeholder="lời nhắn" />
          </>
        }
        onAccept={() => alert('')}
        onClose={() => handleCloseModal('modalCF')}
        variant="default"
        msgCTA="Xác nhận"
      />
    </div>
  );
};

export default DuAnCard;
