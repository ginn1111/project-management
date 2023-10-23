'use client';

import IconPlus from '@/components/Icon/IconPlus';
import IconRefresh from '@/components/Icon/IconRefresh';
import { Button } from '@/components/ui/button';
import Search from '@/components/ui/search';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import { useEffect, useState } from 'react';
import ModalThemPhongBan from './modal/modal-them-phong-ban';
import { useRouter } from 'next/navigation';

const FilterPhongBan = () => {
  const router = useRouter();
  const { handlePush, handleReset, searchParams } = useQueryParams({
    initSearchParams: { search: '', page: 1, limit: 10 },
  });
  const { modal, handleOpenModal, handleCloseModal } = useModal({
    modalCHV: { open: false },
  });

  const [searchValue, setSearchValue] = useState(searchParams.search);

  useEffect(() => {
    setSearchValue(searchParams.search);
  }, [searchParams.search]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handlePush({ search: searchValue ?? '', page: 1 });
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchValue]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4 flex-1">
        <Button size="icon" onClick={() => handleOpenModal('modalCHV')}>
          <IconPlus />
        </Button>
        <Search
          placeholder="tên phòng ban"
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
      <ModalThemPhongBan
        title="Thêm phòng ban"
        onClose={() => handleCloseModal('modalCHV')}
        open={modal.modalCHV.open}
        onRefresh={() => {
          router.refresh();
        }}
      />
    </div>
  );
};

export default FilterPhongBan;
