'use client';

import IconEllipsis from '@/components/Icon/IconEllipsis';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { faker } from '@faker-js/faker';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

const DUMMY = Array(20)
  .fill(0)
  .map(() => ({
    id: faker.string.binary(),
    name: faker.internet.userName(),
    description: faker.finance.ethereumAddress(),
    time: faker.date.anytime(),
    employee: faker.internet.displayName(),
  }));

const DuyetDeXuat = () => {
  const columns: ColumnDef<(typeof DUMMY)[0]>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'time',
      header: 'Time',
      cell: ({ row }) => dayjs(row.getValue('time')).format('DD/MM/YYYY'),
    },
    {
      accessorKey: 'employee',
      header: 'Employee',
    },
    {
      id: 'action',
      header: '',
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost">
                <IconEllipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Duyệt</DropdownMenuItem>
              <DropdownMenuItem>Từ chối</DropdownMenuItem>
              <DropdownMenuItem>Chi tiết</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <div className="m-2">
      <DataTable data={DUMMY} columns={columns} />
    </div>
  );
};

export default DuyetDeXuat;
