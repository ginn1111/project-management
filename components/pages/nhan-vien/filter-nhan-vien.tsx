'use client';

import IconRefresh from '@/components/Icon/IconRefresh';
import IconUserPlus from '@/components/Icon/IconUserPlus';
import { Button } from '@/components/ui/button';
import Search from '@/components/ui/search';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import { useEffect, useState } from 'react';
import ModalThemNhanVien from './modal/modal-them-nhan-vien';

const FilterNhanVien = () => {
  const { handlePush, handleReset, searchParams } = useQueryParams({
    initSearchParams: { search: '', page: 1, limit: 10 },
  });
  const { modal, handleOpenModal, handleCloseModal } = useModal({
    modalNV: { open: false },
  });

  const [searchValue, setSearchValue] = useState(searchParams.search);

  useEffect(() => {
    if (!searchValue) return;
    const timerId = setTimeout(() => {
      handlePush({ search: searchValue ?? '', page: 1 });
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchValue]);

  console.log(searchValue, searchParams.search);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4 flex-1">
        <Button size="icon" onClick={() => handleOpenModal('modalNV')}>
          <IconUserPlus />
        </Button>
        <Search
          placeholder="họ tên, số điện thoại, cmnd/ ccccd"
          classNameContainer="w-full"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>
      <Button
        variant="outline"
        onClick={() => {
          handleReset();
          setSearchValue('');
        }}
      >
        <IconRefresh />
      </Button>
      <ModalThemNhanVien
        title="Thêm nhân viên mới"
        onClose={() => handleCloseModal('modalNV')}
        open={modal.modalNV.open}
        onRefresh={() => {
          handlePush({});
        }}
      />
    </div>
  );
};

export default FilterNhanVien;
