import IconPlus from '@/components/Icon/IconPlus';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/data-table';
import { faker } from '@faker-js/faker';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import ModalThemNguonLuc from '../../du-an/modal/modal-them-nguon-luc';
import useModal from '@/hooks/useModal';

const DUMMY = Array(20)
  .fill(0)
  .map(() => ({
    id: faker.string.alpha(),
    name: faker.string.alphanumeric(),
    amount: faker.number.int(),
    used: faker.number.int(),
  }));

const NguonLuc = () => {
  const { modal, handleCloseModal, handleOpenModal } = useModal({
    modalNL: { open: false },
  });
  const columns: ColumnDef<(typeof DUMMY)[0]>[] = [
    {
      accessorKey: 'id',
    },
    {
      accessorKey: 'name',
    },
    {
      accessorKey: 'amount',
      header: 'Used /amount',
      cell: ({ row }) => (
        <p>
          {row.getValue('used')}/{row.getValue('amount')}
        </p>
      ),
    },
    {
      accessorKey: 'actions',
      size: 100,
      header: '',
      cell: () => (
        <div className="text-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleOpenModal('modalNL')}
          >
            <IconPlus className="w-5 h-5" />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="m-2 p-2">
      <DataTable data={DUMMY} columns={columns} />
      <ModalThemNguonLuc
        data={{}}
        open={modal.modalNL.open}
        onClose={() => handleCloseModal('modalNL')}
        title="Thêm nguồn lực"
      />
    </div>
  );
};

export default NguonLuc;
