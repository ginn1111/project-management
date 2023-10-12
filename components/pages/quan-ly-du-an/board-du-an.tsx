'use client';

import IconEllipsis from '@/components/Icon/IconEllipsis';
import IconSquareCheck from '@/components/Icon/IconSquareCheck';
import IconXSquare from '@/components/Icon/IconXSquare';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToggle } from 'usehooks-ts';
import BoardDuAnItem from './board-du-an-item';
import ModalChiTietDauViec from './modal-du-an/model-chi-tiet-dau-viec';
import ModalGiaoViec from './modal-du-an/modal-giao-viec';
import ModalTaoCongViec from './modal-du-an/modal-tao-cong-viec';
import ModalPhanQuyen from './modal-du-an/modal-phan-quyen';
import ModalLichSu from './modal-du-an/modal-lich-su';
import ModalChinhSuaDauViec from './modal-du-an/modal-chinh-sua-dau-viec';
import { useState } from 'react';
import IconSettings from '@/components/Icon/IconSettings';

interface IModalState {
  open: boolean;
}

const BoardDuAn = () => {
  const [modalState, setModalState] = useState<{
    modalDV: IModalState;
    modalGV: IModalState;
    modalTCV: IModalState;
    modalPQ: IModalState;
    modalLS: IModalState;
    modalCS: IModalState;
  }>({
    modalCS: { open: false },
    modalLS: { open: false },
    modalPQ: { open: false },
    modalTCV: { open: false },
    modalDV: { open: false },
    modalGV: { open: false },
  });
  const handleOpenModal = (name: keyof typeof modalState) =>
    setModalState((old) => ({ ...old, [name]: { open: true } }));

  const handleCloseModal = (name: keyof typeof modalState) =>
    setModalState((old) => ({ ...old, [name]: { open: false } }));

  return (
    <div className="rounded-sm px-2 pb-2 flex-shrink-0 min-w-[500px] w-min">
      <div className="text-primary px-4 py-2 rounded-t-md flex items-center shadow-[0_-5px_15px_-10px] shadow-primary2/50 flex-wrap max-w-full">
        <p className="text-xl font-bold max-w-full word-wrap-wrap mr-1">
          Khảo sát dự án
        </p>

        <div className="flex items-center rounded-sm gap-1 mr-1">
          <IconSquareCheck className="w-4 h-4 text-success" />
          <div className="text-xs ltr:ml-2">5 Tasks</div>
        </div>

        <div className="flex items-center rounded-sm gap-1">
          <IconXSquare className="w-4 h-4 text-danger" />
          <div className="text-xs ltr:ml-2">5 Tasks</div>
        </div>

        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="sm">
                <IconSettings />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleOpenModal('modalCS')}>
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
              <DropdownMenuItem onClick={() => handleOpenModal('modalLS')}>
                Lịch sử
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ul className="max-w-[500px] w-max-content p-4 rounded-b-md space-y-3 bg-primary2-light overflow-y-auto h-max">
        <BoardDuAnItem status="done" title="Viec 1" progress={60} />
        <BoardDuAnItem status="progress" title="Viec 1" progress={100} />
        <BoardDuAnItem status="progress" title="Viec 1" progress={100} />
        <BoardDuAnItem status="progress" title="Viec 1" progress={100} />
        {Math.random() > 0.5 ? (
          <BoardDuAnItem status="failed" title="Viec 1" progress={100} />
        ) : null}
      </ul>
      <ModalChiTietDauViec
        open={modalState.modalDV.open}
        onClose={() => handleCloseModal('modalDV')}
        data={{}}
        title="Khảo sát dự án Khảo sát dự án Khảo sát dự án"
      />
      <ModalGiaoViec
        open={modalState.modalGV.open}
        title="Giao việc"
        data={{}}
        onClose={() => handleCloseModal('modalGV')}
      />
      <ModalTaoCongViec
        open={modalState.modalTCV.open}
        title="Tạo công việc"
        data={{}}
        onClose={() => handleCloseModal('modalTCV')}
      />
      <ModalPhanQuyen
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
      <ModalChinhSuaDauViec
        open={modalState.modalCS.open}
        data={{}}
        onClose={() => handleCloseModal('modalCS')}
        title="Chỉnh sửa đầu việc"
      />
    </div>
  );
};
export default BoardDuAn;
