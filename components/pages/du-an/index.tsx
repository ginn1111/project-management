'use client';
import DuAnCard from '@/components/pages/du-an/du-an-card';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import IconPlus from '@/components/Icon/IconPlus';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import ModalThemDuAn from '@/components/pages/du-an/modal/modal-them-du-an';
import Search from '@/components/ui/search';
import { Input } from '@/components/ui/input';
dayjs.extend(duration);

const DuAn = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="flex items-center justify-end gap-4 mt-2 mx-2">
        <Search />
        <div className="flex items-center gap-2">
          <Input type="date" />
          <Input type="date" />
        </div>
        <Button
          variant="outline"
          className="items-center gap-2"
          onClick={() => setOpenModal(true)}
        >
          <IconPlus />
          Thêm dự án
        </Button>
      </div>
      <div className="grid grid-cols-fill-300 gap-3 m-2">
        {Array(10)
          .fill(0)
          .map((_, idx) => (
            <DuAnCard key={idx} />
          ))}
      </div>
      <ModalThemDuAn
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Thêm dự án mới"
      />
    </>
  );
};

export default DuAn;
