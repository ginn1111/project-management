'use client';

import IconPlus from '@/components/Icon/IconPlus';
import IconRefresh from '@/components/Icon/IconRefresh';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Search from '@/components/ui/search';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ModalThemDuAn from './modal/modal-them-du-an';
import { useRouter } from 'next/navigation';

const FilterDuAn = () => {
  const { handlePush, handleReset, searchParams } = useQueryParams({
    initSearchParams: {
      finishDateET: '',
      startDate: '',
      search: '',
    },
  });
  const router = useRouter();

  const [filter, setFilter] = useState({ ...searchParams });

  const { handleCloseModal, handleOpenModal, modal } = useModal({
    modalPJ: { open: false },
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      const { search, startDate, finishDateET } = filter ?? {};
      handlePush({
        search: search,
        startDate: dayjs(startDate).isValid()
          ? dayjs(startDate).toISOString()
          : '',
        finishDateET: dayjs(finishDateET).isValid()
          ? dayjs(finishDateET).toISOString()
          : '',
      });
    });

    return () => clearTimeout(timerId);
  }, [JSON.stringify(filter)]);

  return (
    <div className="flex items-center justify-end gap-4 mt-2 mx-2">
      <Search
        value={filter.search}
        onChange={(e) => {
          setFilter((old) => ({ ...old, search: e.target.value }));
        }}
      />
      <div className="flex items-center gap-2">
        <Input
          type="date"
          value={
            dayjs(filter.startDate).isValid()
              ? dayjs(filter.startDate).format('YYYY-MM-DD')
              : ''
          }
          onChange={(e) =>
            setFilter((old) => ({ ...old, startDate: e.target.valueAsDate }))
          }
        />
        <Input
          type="date"
          value={
            dayjs(filter.finishDateET).isValid()
              ? dayjs(filter.finishDateET).format('YYYY-MM-DD')
              : ''
          }
          onChange={(e) =>
            setFilter((old) => ({ ...old, finishDateET: e.target.valueAsDate }))
          }
        />
      </div>
      <Button
        variant="outline"
        className="items-center gap-2"
        onClick={() => handleOpenModal('modalPJ')}
      >
        <IconPlus />
        Thêm dự án
      </Button>
      <Button
        variant="outline"
        className="items-center gap-2"
        onClick={() => {
          handleReset();
          setFilter({
            search: '',
            startDate: '',
            finishDateET: '',
          });
        }}
      >
        <IconRefresh />
      </Button>

      <ModalThemDuAn
        open={modal.modalPJ.open}
        onClose={() => handleCloseModal('modalPJ')}
        title="Thêm dự án mới"
        onRefresh={() => router.refresh()}
      />
    </div>
  );
};

export default FilterDuAn;
