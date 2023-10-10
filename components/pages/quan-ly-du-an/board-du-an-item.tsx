import IconClock from '@/components/Icon/IconClock';
import IconEllipsis from '@/components/Icon/IconEllipsis';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
import ModalChiTietCongViec from './modal-du-an-item/modal-chi-tiet-cong-viec';
import ModalChinhSuaCongViec from './modal-du-an-item/modal-chinh-sua-cong-viec';
import ModalLichSu from './modal-du-an-item/modal-lich-su';
import ModalPhanQuyen from './modal-du-an-item/modal-phan-quyen';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const LABEL_COLOR = {
  progress: 'bg-secondary2',
  done: 'bg-success',
  failed: 'bg-danger',
} as const;

const LABEL: { [k in keyof typeof LABEL_COLOR]: string } = {
  progress: 'Đang thực hiện',
  done: 'Đã hoàn thành',
  failed: 'Quá hạn',
};

type BoardDuAnItemProps = {
  status: keyof typeof LABEL_COLOR;
  title: ReactNode;
  progress: number;
};

interface IModalState {
  open: boolean;
}

const BoardDuAnItem = (props: BoardDuAnItemProps) => {
  const { status, title, progress } = props;
  const [modalState, setModalState] = useState<{
    modalLS: IModalState;
    modalPQ: IModalState;
    modalCT: IModalState;
    modalCS: IModalState;
    modalDone: IModalState;
  }>({
    modalCS: { open: false },
    modalLS: { open: false },
    modalPQ: { open: false },
    modalCT: { open: false },
    modalDone: { open: false },
  });
  const handleOpenModal = (name: keyof typeof modalState) =>
    setModalState((old) => ({ ...old, [name]: { open: true } }));

  const handleCloseModal = (name: keyof typeof modalState) =>
    setModalState((old) => ({ ...old, [name]: { open: false } }));

  return (
    <li className="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light p-5 justify-start">
      <div className="flex justify-between mb-5 items-center">
        <h6 className="text-black font-semibold text-base dark:text-white-light">
          {title}
        </h6>
        <span
          className={cn(
            'uppercase badge bg-primary/10 py-1.5',
            LABEL_COLOR[status]
          )}
        >
          {LABEL[status]}
        </span>
      </div>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo,
        similique quisquam quasi laborum rerum sed quaerat facilis ex magnam
        voluptates iste impedit labore repellat quia! Dolores explicabo est
        aspernatur aperiam.
      </p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center rounded-full bg-danger/20 px-2 py-1 text-xs font-semibold text-danger w-max">
          <IconClock className="w-3 h-3 mr-1" />3 Days Left
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">
              <IconEllipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleOpenModal('modalDone')}>
              Hoàn thành
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenModal('modalCS')}>
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenModal('modalCT')}>
              Chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenModal('modalPQ')}>
              Phân quyền
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenModal('modalLS')}>
              Lịch sử
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ModalPhanQuyen
        data={{}}
        open={modalState.modalPQ.open}
        title="Phân quyền"
        onClose={() => handleCloseModal('modalPQ')}
      />
      <ModalChinhSuaCongViec
        data={{}}
        open={modalState.modalCS.open}
        title="Chỉnh sửa công việc"
        onClose={() => handleCloseModal('modalCS')}
      />

      <ModalChiTietCongViec
        data={{}}
        open={modalState.modalCT.open}
        title="Khảo sát dự án 1"
        onClose={() => handleCloseModal('modalCT')}
      />
      <ModalLichSu
        data={{}}
        open={modalState.modalLS.open}
        title="Lịch sử"
        onClose={() => handleCloseModal('modalLS')}
      />
      <ModalConfirm
        variant="default"
        msgCTA="Xác nhận hoàn thành"
        title="Bạn chắc chắn muốn hoàn thành?"
        message={
          <Alert className="border-warning text-warning">
            <AlertCircle color="#fbbf24" className="w-4 h-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Sau khi hoàn thành, bạn sẽ không được chỉnh sửa!
            </AlertDescription>
          </Alert>
        }
        open={modalState.modalDone.open}
        onAccept={() => alert('Done task')}
        onClose={() => handleCloseModal('modalDone')}
      />
    </li>
  );
};

export default BoardDuAnItem;
