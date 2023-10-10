import DataTable from '@/components/ui/data-table';
import Modal, { IModalProps } from '@/components/ui/modal';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

interface IModalLichSu<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const DUMMY = Array(20)
  .fill(0)
  .map(() => ({
    id: faker.string.alphanumeric(),
    employee: faker.internet.displayName(),
    date: faker.date.anytime(),
    content: faker.hacker.abbreviation(),
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
            {
              accessorKey: 'employee',
              header: 'Employee',
            },
            {
              accessorKey: 'date',
              header: 'date',
              cell: ({ row }) =>
                dayjs(row.getValue('date')).format('ddd - DD/MM/YYYY'),
            },
            { accessorKey: 'content', header: 'content' },
          ]}
        />
      </div>
    </Modal>
  );
};

export default ModalLichSu;
