'use client';
import IconEllipsis from '@/components/Icon/IconEllipsis';
import IconPlus from '@/components/Icon/IconPlus';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useModal from '@/hooks/useModal';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import ModalThemChungChi from '../../modal/modal-them-chung-chi';

interface IChungChi {
  certificates?: CertsEmployee[];
}

const ChungChi = ({ certificates }: IChungChi) => {
  const { modal, handleCloseModal, handleOpenModal } = useModal({
    modalCC: { open: false, isEdit: false },
  });
  const columns = [
    {
      accessor: '',
      title: 'Tên',
      render: (row: CertsEmployee) => {
        return <p>{row.certification.name}</p>;
      },
    },
    {
      title: 'Ngày cấp',
      accessor: 'date',
      render: ({ date }: CertsEmployee) => (
        <p>
          {dayjs(date).isValid() ? dayjs(date).format('DD/MM/YYYY') : 'N/A'}
        </p>
      ),
    },
    {
      title: 'Ngày hết hạn',
      accessor: 'expiredDate',
      render: ({ expiredDate }: CertsEmployee) => (
        <p>
          {dayjs(expiredDate).isValid()
            ? dayjs(expiredDate).format('DD/MM/YYYY')
            : 'N/A'}
        </p>
      ),
    },
    {
      title: 'Ghi chú',
      accessor: 'note',
      render: ({ note }: CertsEmployee) => <p>{note ?? 'N/A'}</p>,
    },
    {
      accessor: '',
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IconEllipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => handleOpenModal('modalCC', { isEdit: true })}
            >
              Sửa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-bold mb-1">Chứng chỉ</p>
        <Button onClick={() => handleOpenModal('modalCC', { isEdit: false })}>
          <IconPlus />
        </Button>
      </div>
      <div className="datatables">
        <DataTable
          noRecordsText="No results match your search query"
          highlightOnHover
          className="table-hover whitespace-nowrap"
          records={certificates ?? []}
          totalRecords={certificates?.length}
          columns={columns}
          minHeight={200}
        />
      </div>
      <ModalThemChungChi
        isEdit={modal.modalCC.isEdit}
        open={modal.modalCC.open}
        onClose={() => handleCloseModal('modalCC')}
        title="chứng chỉ"
      />
    </div>
  );
};

export default ChungChi;
