'use client';
import DataTable from '@/components/ui/data-table';
import { faker } from '@faker-js/faker';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import React from 'react';

const DUMMY = Array(10)
  .fill(0)
  .map(() => ({
    phongBan: faker.string.sample(),
    start: faker.date.anytime(),
    end: faker.date.anytime(),
  }));

const LichSuPB = () => {
  const columns: ColumnDef<(typeof DUMMY)[0]>[] = [
    {
      accessorKey: 'phongBan',
    },
    {
      accessorKey: 'start',
      cell: ({ row }) => (
        <p>{dayjs(row.getValue('start')).format('DD/MM/YYYY')}</p>
      ),
    },
    {
      accessorKey: 'end',
      cell: ({ row }) => (
        <p>{dayjs(row.getValue('end')).format('DD/MM/YYYY')}</p>
      ),
    },
  ];
  return (
    <div>
      <p className="mb-1 text-lg font-bold">Lịch sử phòng ban</p>
      <DataTable data={DUMMY} columns={columns} />
    </div>
  );
};

export default LichSuPB;
