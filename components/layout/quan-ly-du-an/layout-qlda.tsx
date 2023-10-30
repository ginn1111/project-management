'use client';

import IconAuthenTool from '@/components/Icon/IconAuthenTool';
import IconRecommend from '@/components/Icon/IconRecommend';
import IconWork from '@/components/Icon/IconWork';
import { Button } from '@/components/ui/button';

import useModal from '@/hooks/useModal';
import { useParams } from 'next/navigation';
import ModalPhanQuyenDA from './modal-tool-bar/modal-phan-quyen-da';
import ModalTaoDauViec from './modal-tool-bar/modal-tao-dau-viec';
import ModalTaoDeXuat from './modal-tool-bar/modal-tao-de-xuat';

const LayoutQLDA = () => {
  const { id } = useParams();
  const { modal, handleCloseModal, handleOpenModal } = useModal({
    modalTDV: { open: false, idProject: '' },
    modalPQDA: { open: false },
    modalTDX: { open: false },
  });

  return (
    <div className="p-2 rounded-md bg-primary2-light m-2 flex items-center gap-2 justify-end sticky top-2 z-10">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleOpenModal('modalTDV', { idProject: id })}
      >
        <IconWork />
        <span className="ml-2">Tạo đầu việc</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleOpenModal('modalPQDA')}
      >
        <IconAuthenTool />
        <span className="ml-2">Phân quyền dự án</span>
      </Button>
      <Button variant="outline" onClick={() => handleOpenModal('modalTDX')}>
        <IconRecommend />
        <span className="ml-2">Tạo đề xuất</span>
      </Button>
      <ModalPhanQuyenDA
        title="Phân quyền dự án"
        open={modal.modalPQDA.open}
        data={{}}
        onClose={() => handleCloseModal('modalPQDA')}
      />
      <ModalTaoDeXuat
        title="Tạo đề xuất"
        open={modal.modalTDX.open}
        data={{}}
        onClose={() => handleCloseModal('modalTDX')}
      />
      <ModalTaoDauViec
        title="Thêm đầu việc"
        open={modal.modalTDV.open}
        data={modal.modalTDV}
        onClose={() => handleCloseModal('modalTDV')}
      />
    </div>
  );
};

export default LayoutQLDA;
