'use client';

import IconRefresh from '@/components/Icon/IconRefresh';
import IconUserPlus from '@/components/Icon/IconUserPlus';
import { Button } from '@/components/ui/button';
import Search from '@/components/ui/search';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import { debounce } from 'lodash';
import ModalThemNhanVien from './modal/modal-them-nhan-vien';

const FilterNhanVien = () => {
  const { handlePush, handleReset, searchParams } = useQueryParams({
    initSearchParams: { search: '', page: 1, limit: 10 },
  });
  const { modal, handleOpenModal, handleCloseModal } = useModal({
    modalNV: { open: false },
  });

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4 flex-1">
        <Button size="icon" onClick={() => handleOpenModal('modalNV')}>
          <IconUserPlus />
        </Button>
        <Search
          placeholder="họ tên, số điện thoại, cmnd/ ccccd"
          classNameContainer="w-full"
          defaultValue={searchParams.search}
          onChange={(e) => {
            debounce(
              () =>
                handlePush({ search: (e.target as any).value ?? '', page: 1 }),
              300
            )();
          }}
        />
      </div>
      <Button variant="outline" onClick={handleReset}>
        <IconRefresh />
      </Button>
      <ModalThemNhanVien
        title="Thêm nhân viên mới"
        onClose={() => handleCloseModal('modalNV')}
        open={modal.modalNV.open}
      />
    </div>
  );
};

export default FilterNhanVien;
