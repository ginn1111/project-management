'use client';

import IconSettings from '@/components/Icon/IconSettings';
import IconSquareCheck from '@/components/Icon/IconSquareCheck';
import IconXSquare from '@/components/Icon/IconXSquare';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useModal from '@/hooks/useModal';
import BoardDuAnItem from './board-du-an-item';
import ModalChinhSuaDauViec from './modal-du-an/modal-chinh-sua-dau-viec';
import ModalGiaoViec from './modal-du-an/modal-giao-viec';
import ModalLichSu from './modal-du-an/modal-lich-su';
import ModalPhanQuyen from './modal-du-an/modal-phan-quyen';
import ModalTaoCongViec from './modal-du-an/modal-tao-cong-viec';
import ModalChiTietDauViec from './modal-du-an/model-chi-tiet-dau-viec';
import { cn } from '@/lib/utils';
import { ColorStatusDauViec } from '@/constants/theme';
import ModalDanhGia from './nhan-vien-du-an/modal/modal-danh-gia';

interface IBoardDuAn extends IWorkProject {}

const BoardDuAn = (props: IBoardDuAn) => {
  const { work, worksOfEmployee } = props;
  console.log(worksOfEmployee.flat());
  const {
    modal: modalState,
    handleCloseModal,
    handleOpenModal,
  } = useModal({
    modalCS: { open: false },
    modalLS: { open: false },
    modalPQ: { open: false },
    modalTCV: { open: false },
    modalDV: { open: false },
    modalGV: { open: false },
    modalDG: { open: false },
  });

  return (
    <div className="rounded-sm px-2 pb-2 flex-shrink-0 min-w-[500px] w-min">
      <div className="text-primary px-4 py-2 rounded-t-md flex items-center shadow-[0_-5px_15px_-10px] shadow-primary2/50 flex-wrap max-w-full gap-2">
        <p className="text-xl font-bold max-w-full word-wrap-wrap mr-1">
          {work?.name}
        </p>
        <div
          className={cn(
            'rounded-full shrink-0 px-2 py-1 text-[12px] ml-auto',
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
            <div className="text-xs">5 Tasks</div>
          </div>

          <div className="flex items-center rounded-sm gap-1">
            <IconXSquare className="w-4 h-4 text-danger" />
            <div className="text-xs">5 Tasks</div>
          </div>
        </div>
      </div>
      <ul className="max-w-[500px] w-max-content p-4 rounded-b-md space-y-3 bg-primary2-light overflow-y-auto h-max">
        {worksOfEmployee?.map((worksOfEmployee) => {
          return (
            <li key={worksOfEmployee.id}>
              {worksOfEmployee.tasksOfWork?.map((taskOfWork) => (
                <BoardDuAnItem
                  key={taskOfWork.idTask}
                  status="progress"
                  title={taskOfWork.task.name}
                  progress={taskOfWork.percentOfDone}
                  note={taskOfWork.task.note}
                />
              ))}
            </li>
          );
        })}
        {/* <BoardDuAnItem status="progress" title="Viec 1" progress={100} />
        <BoardDuAnItem status="progress" title="Viec 1" progress={100} />
        <BoardDuAnItem status="progress" title="Viec 1" progress={100} />
        {Math.random() > 0.5 ? (
          <BoardDuAnItem status="failed" title="Viec 1" progress={100} />
        ) : null} */}
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
