'use client';

import IconAuthenTool from '@/components/Icon/IconAuthenTool';
import IconRecommend from '@/components/Icon/IconRecommend';
import IconWork from '@/components/Icon/IconWork';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
import ModalPhanQuyenDA from './modal-tool-bar/modal-phan-quyen-da';
import ModalTaoDauViec from './modal-tool-bar/modal-tao-dau-viec';
import ModalTaoDeXuat from './modal-tool-bar/modal-tao-de-xuat';

interface IModalState {
  open: boolean;
}

const LayoutQLDA = () => {
  const [modalState, setModalState] = useState<{
    modalTDV: IModalState;
    modalPQDA: IModalState;
    modalTDX: IModalState;
  }>({
    modalTDV: { open: false },
    modalPQDA: { open: false },
    modalTDX: { open: false },
  });

  const handleOpenModal = (name: keyof typeof modalState) => {
    setModalState((old) => ({ ...old, [name]: { open: true } }));
  };

  const handleCloseModal = (name: keyof typeof modalState) => {
    setModalState((old) => ({ ...old, [name]: { open: false } }));
  };
  return (
    <div className="p-2 rounded-md bg-primary2-light m-2 flex items-center gap-2 justify-end sticky top-2 z-10">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleOpenModal('modalTDV')}
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
        open={modalState.modalPQDA.open}
        data={{}}
        onClose={() => handleCloseModal('modalPQDA')}
      />
      <ModalTaoDeXuat
        title="Tạo đề xuất"
        open={modalState.modalTDX.open}
        data={{}}
        onClose={() => handleCloseModal('modalTDX')}
      />
      <ModalTaoDauViec
        title="Thêm đầu việc"
        open={modalState.modalTDV.open}
        data={{}}
        onClose={() => handleCloseModal('modalTDV')}
      />
    </div>
  );
};

export default LayoutQLDA;
