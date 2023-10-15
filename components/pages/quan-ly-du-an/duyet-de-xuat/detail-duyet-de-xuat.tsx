import DataTable from '@/components/ui/data-table';
import { faker } from '@faker-js/faker';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

const DUMMY = Array(10)
  .fill(0)
  .map(() => ({
    id: faker.string.alphanumeric(),
    name: faker.internet.displayName(),
    amount: 10,
  }));

const DetailDuyetDeXuat = () => {
  const columns: ColumnDef<(typeof DUMMY)[0]>[] = [
    {
      accessorKey: 'id',
    },
    {
      accessorKey: 'name',
    },
    {
      accessorKey: 'amount',
    },
  ];
  return (
    <div>
      <DataTable columns={columns} data={DUMMY} />
    </div>
  );
};

export default DetailDuyetDeXuat;
