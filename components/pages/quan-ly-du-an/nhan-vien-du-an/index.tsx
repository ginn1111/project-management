import DataTable from '@/components/ui/data-table';
import React from 'react';
import { faker } from '@faker-js/faker';
import { ColumnDef } from '@tanstack/react-table';
import IconEye from '@/components/Icon/IconEye';
import IconEdit from '@/components/Icon/IconEdit';
import IconTrash from '@/components/Icon/IconTrash';

const DUMMY = Array(20)
  .fill(0)
  .map(() => ({
    id: faker.string.alphanumeric(),
    name: faker.internet.displayName(),
    email: faker.internet.email(),
  }));

const NhanVienDuAn = () => {
  const columns: ColumnDef<(typeof DUMMY)[0]>[] = [
    {
      id: 'id',
      accessorKey: 'id',
    },
    {
      id: 'name',
      accessorKey: 'name',
    },
    {
      id: 'email',
      accessorKey: 'email',
    },
    {
      id: 'actions',
      header: () => <p className="text-center">Thao tác</p>,
      cell: () => {
        return (
          <div className="flex items-center gap-4 justify-center cursor-pointer">
            <IconEye className="hover:text-info" />
            <IconEdit className="hover:text-warning" />
            <IconTrash className="hover:text-danger" />
          </div>
        );
      },
    },
  ];

  return (
    <div className="mx-2">
      <DataTable columns={columns} data={DUMMY} />
    </div>
  );
};

export default NhanVienDuAn;
