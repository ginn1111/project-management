import DataTable from '@/components/ui/data-table';
import Modal, { IModalProps } from '@/components/ui/modal';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import React from 'react';

interface IModalLichSu<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const DUMMY = Array(20)
  .fill(0)
  .map(() => ({
    id: faker.string.alphanumeric(),
    employee: faker.internet.displayName(),
    date: faker.date.anytime(),
    content: faker.animal.bear(),
  }));

const ModalLichSu = <T,>(props: IModalLichSu<T>) => {
  const { data, ...rest } = props;
  return (
    <Modal {...rest}>
      <div className="w-[80vh]">
        <DataTable
          data={DUMMY}
          columns={[
            {
              accessorKey: 'id',
              header: 'id',
            },
            { accessorKey: 'employee', header: 'Employee' },
            {
              accessorKey: 'date',
              header: 'date',
              cell: ({ row }) => (
                <div className="w-100">
                  {dayjs(row.getValue('date')).format('ddd - DD/MM/YYYY')}
                </div>
              ),
            },
            { accessorKey: 'content', header: 'content' },
          ]}
        />
      </div>
    </Modal>
  );
};

export default ModalLichSu;
