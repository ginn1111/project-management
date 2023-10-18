import FilterNhanVien from '@/components/pages/nhan-vien/filter-nhan-vien';
import TableNhanVien from '@/components/pages/nhan-vien/table-nhan-vien';
import { getList } from '@/lib/employee';
import { getProvinces } from '@/lib/utils/address';
import React from 'react';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const NhanVien = async ({ searchParams }: { searchParams: ISearchParams }) => {
  const employeeData = await getList(
    `page=${(parseInt(searchParams.page as any) || 1) - 1}&limit=${
      parseInt(searchParams.limit as any) || 10
    }&search=${searchParams.search ?? ''}`
  );
  const provincesData = await getProvinces();
  const provinces = provincesData.data;
  return (
    <div className="m-2 rounded-sm p-2">
      <FilterNhanVien />
      <div className="mt-4">
        <TableNhanVien provinces={provinces} data={employeeData.data} />
      </div>
    </div>
  );
};

export default NhanVien;
