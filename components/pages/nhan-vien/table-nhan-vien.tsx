'use client';

import ModalConfirm from '@/components/ui/modal/modal-confirm';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import { DataTable } from 'mantine-datatable';
import { useQueryClient } from 'react-query';
import ModalChuyenPB from './modal/modal-chuyen-pb';
import ModalThemBangCap from './modal/modal-them-bang-cap';
import ModalThemChungChi from './modal/modal-them-chung-chi';
import ModalThemNhanVien from './modal/modal-them-nhan-vien';

interface ITableNhanVien {
  provinces: {
    id: string;
    code: number;
    name: string;
  };
  data: { employees: IEmployee[]; totalItems: number };
}

const TableNhanVien = (props: ITableNhanVien) => {
  const { provinces, data } = props;
  const { handlePush, searchParams } = useQueryParams({
    initSearchParams: { page: 1, limit: 10, search: '' },
  });
  console.log(searchParams);
  const queryClient = useQueryClient();
  queryClient.setQueryData('provinces', provinces);

  const { modal, handleOpenModal, handleCloseModal } = useModal({
    modalNV: { open: false },
    modalRM: { open: false },
    modalPB: { open: false },
    modalBC: { open: false },
    modalCC: { open: false },
  });

  return (
    <>
      <div className="datatables">
        <DataTable
          noRecordsText="No results match your search query"
          highlightOnHover
          className="table-hover whitespace-nowrap"
          records={data.employees}
          columns={[
            { accessor: 'id', title: 'ID' },
            { accessor: 'fullName', title: 'First Name' },
            { accessor: 'email' },
            { accessor: 'phone' },
          ]}
          totalRecords={data.totalItems}
          recordsPerPage={parseInt(searchParams.limit)}
          page={parseInt(searchParams.page)}
          onPageChange={(p) => {
            handlePush({ page: p });
          }}
          recordsPerPageOptions={[10, 20, 30, 50, 100]}
          onRecordsPerPageChange={(limit) => {
            handlePush({ limit: limit });
          }}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Showing  ${from} to ${to} of ${totalRecords} entries`
          }
        />
      </div>
      <ModalThemNhanVien
        open={modal.modalNV.open}
        title="Sửa nhân viên"
        onClose={() => handleCloseModal('modalNV')}
        data={{}}
        isEdit
      />
      <ModalConfirm
        title="Xoá nhân viên"
        message="Bạn có muốn xoá nhân viên này?"
        onAccept={() => {}}
        onClose={() => handleCloseModal('modalRM')}
        open={modal.modalRM.open}
      />
      <ModalChuyenPB
        open={modal.modalPB.open}
        onClose={() => handleCloseModal('modalPB')}
        title="Chuyển phòng ban nhân viên"
        data={{}}
      />
      <ModalThemBangCap
        open={modal.modalBC.open}
        onClose={() => handleCloseModal('modalBC')}
        title="bằng cấp"
      />
      <ModalThemChungChi
        open={modal.modalCC.open}
        onClose={() => handleCloseModal('modalCC')}
        title="chứng chỉ"
      />
    </>
  );
};

export default TableNhanVien;
