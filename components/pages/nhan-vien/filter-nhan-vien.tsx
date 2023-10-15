'use client';

import IconUserPlus from '@/components/Icon/IconUserPlus';
import { Button } from '@/components/ui/button';
import Search from '@/components/ui/search';
import React from 'react';
import ModalThemNhanVien from './modal/modal-them-nhan-vien';
import useModal from '@/hooks/useModal';
import IconSearch from '@/components/Icon/IconSearch';
import IconRefresh from '@/components/Icon/IconRefresh';

const FilterNhanVien = () => {
  const { modal, handleOpenModal, handleCloseModal } = useModal({
    modalNV: { open: false },
  });

  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-4 flex-1">
        <Button size="icon" onClick={() => handleOpenModal('modalNV')}>
          <IconUserPlus />
        </Button>
        <Search
          placeholder="họ tên, số điện thoại, cmnd/ ccccd"
          classNameContainer="w-full"
        />
      </div>
      <div className="ml-auto gap-4 flex items-center">
        <Button variant="outline">
          <IconRefresh />
        </Button>
        <Button>
          <IconSearch />
        </Button>
      </div>
      <ModalThemNhanVien
        title="Thêm nhân viên mới"
        data={{}}
        onClose={() => handleCloseModal('modalNV')}
        open={modal.modalNV.open}
      />
    </div>
  );
};

export default FilterNhanVien;
