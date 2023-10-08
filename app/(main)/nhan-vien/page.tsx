import FilterNhanVien from '@/components/pages/nhan-vien/filter-nhan-vien';
import TableNhanVien from '@/components/pages/nhan-vien/table-nhan-vien';
import React from 'react';

const NhanVien = () => {
  return (
    <div className="bg-card m-4 rounded-sm p-2">
      <FilterNhanVien />
      <div className="mt-4">
        <TableNhanVien />
      </div>
    </div>
  );
};

export default NhanVien;
