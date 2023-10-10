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
import ModalChiTietDauViec from './modal/model-chi-tiet-dau-viec';
import ModalGiaoViec from './modal/modal-giao-viec';
import ModalTaoCongViec from './modal/modal-tao-cong-viec';
import ModalPhanQuyen from './modal/modal-phan-quyen';
import ModalLichSu from './modal/modal-lich-su';

const BoardDuAn = () => {
  const [openModalDV, , setOpenModalDV] = useToggle();
  const [openModalGV, , setOpenModalGV] = useToggle();
  const [openModalTCV, , setOpenModalTCV] = useToggle();
  const [openModalPQ, , setOpenModalPQ] = useToggle();
  const [openModalLS, , setOpenModalLS] = useToggle();

  return (
    <div className="rounded-sm p-2 flex-shrink-0 min-w-[500px] w-min">
      <div className="text-primary px-4 py-2 rounded-t-md flex items-center shadow-[0_-2px_20px_-10px] shadow-primary/50 flex-wrap max-w-full">
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenModalDV(true)}
              >
                <IconEllipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setOpenModalDV(true)}>
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenModalDV(true)}>
                Chi tiết
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenModalTCV(true)}>
                Tạo công việc
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenModalGV(true)}>
                Giao việc
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenModalPQ(true)}>
                Phân quyền
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenModalLS(true)}>
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
        open={openModalDV}
        onClose={() => setOpenModalDV(false)}
        data={{}}
        title="Khảo sát dự án Khảo sát dự án Khảo sát dự án"
      />
      <ModalGiaoViec
        open={openModalGV}
        title="Giao việc"
        data={{}}
        onClose={() => setOpenModalGV(false)}
      />
      <ModalTaoCongViec
        open={openModalTCV}
        title="Tạo công việc"
        data={{}}
        onClose={() => setOpenModalTCV(false)}
      />
      <ModalPhanQuyen
        open={openModalPQ}
        title="Phân quyền"
        data={{}}
        onClose={() => setOpenModalPQ(false)}
      />
      <ModalLichSu
        open={openModalLS}
        title="Lịch sử"
        data={{}}
        onClose={() => setOpenModalLS(false)}
      />
    </div>
  );
};
export default BoardDuAn;
