import React from 'react';
import * as EmployeeServices from '@/lib/employee';
import { default as _ChiTietNhanVien } from '@/components/pages/nhan-vien/chi-tiet';

const ChiTietNhanVien = async ({
  params,
}: {
  params: Record<string, string>;
}) => {
  const detailEmployee = await EmployeeServices.getDetail(params.id);
  return <_ChiTietNhanVien detail={detailEmployee} />;
};

export default ChiTietNhanVien;
