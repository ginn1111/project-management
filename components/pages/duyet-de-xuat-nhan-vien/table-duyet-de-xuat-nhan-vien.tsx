'use client';

import IconEllipsis from '@/components/Icon/IconEllipsis';
import { Button } from '@/components/ui/button';
import { DataTable } from 'mantine-datatable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import dayjs from 'dayjs';
import { Textarea } from '@/components/ui/textarea';
import Label from '@/components/ui/my-label';
import { ReactNode, useRef } from 'react';
import { StatePropose } from '@/constants/general';
import { useMutation } from 'react-query';
import { ReviewProjectServices } from '@/lib';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { cx } from 'class-variance-authority';

interface ITableDuyetDXDA {
  data: { reviewProposes: ReviewingProposeProject[]; totalItems: number };
}

const TableDuyetDXNV = ({ data }: ITableDuyetDXDA) => {
  const router = useRouter();
  const { searchParams, handlePush } = useQueryParams({
    initSearchParams: { idProject: '', page: 1, limit: 10 },
  });
  const reasonRef = useRef<HTMLTextAreaElement | null>(null);
  const { handleOpenModal, handleCloseModal, modal } = useModal({
    modalDN: { open: false, id: '' },
    modalAC: { open: false, id: '' },
  });

  const { mutate: review, isLoading: reviewing } = useMutation({
    mutationFn: ReviewProjectServices.review,
    onError: (error) => {
      toast.error((error as AxiosError).response?.data as ReactNode);
    },
  });

  const handleApprove = (note?: string) => {
    review(
      {
        note,
        stateName: StatePropose.Approve,
        id: modal.modalAC.id,
      },
      {
        onSuccess: () => {
          toast.success('Duyệt đề xuất thành công');
          router.refresh();
        },
        onSettled: () => handleCloseModal('modalAC'),
      }
    );
  };
  const handleReject = (note?: string) => {
    review(
      {
        note,
        stateName: StatePropose.Reject,
        id: modal.modalDN.id,
      },
      {
        onSuccess: () => {
          toast.success('Từ chối đề xuất thành công');
          router.refresh();
        },
        onSettled: () => handleCloseModal('modalDN'),
      }
    );
  };

  const columns = [
    {
      accessor: 'project',
      title: 'Dự án tham gia',
      render: (row: ReviewingProposeProject) => (
        <p>{row.proposeProject.project.name ?? 'N/A'}</p>
      ),
    },
    {
      accessor: 'proposeProject.employeesOfDepartment.employee.fullName',
      title: 'Nhân viên đề xuất',
    },

    {
      accessor: 'proposeProject.createdDate',
      title: 'Ngày giờ tạo',
      render: (row: ReviewingProposeProject) => {
        return (
          <p>
            {dayjs(row.proposeProject.createdDate).isValid()
              ? dayjs(row.proposeProject.createdDate).format(
                  'DD/MM/YYYY - HH:mm'
                )
              : 'N/A'}
          </p>
        );
      },
    },
    {
      accessor: 'reviewingDate',
      title: 'Ngày giờ duyệt',
      render: (row: ReviewingProposeProject) => {
        return (
          <p>
            {dayjs(row.reviewingDate).isValid()
              ? dayjs(row.reviewingDate).format('DD/MM/YYYY - HH:mm')
              : 'N/A'}
          </p>
        );
      },
    },
    {
      accessor: 'proposeProject.content',
      title: 'Nội dung đề xuất',
    },
    {
      accessor: 'statePropose',
      title: 'Trạng thái',
      render: (row: ReviewingProposeProject) => (
        <p
          className={cx('text-center text-[12px] rounded-md py-[2px]', {
            'text-success bg-success-light':
              row.statePropose.name === StatePropose.Approve,
            'text-danger bg-danger-light':
              row.statePropose.name === StatePropose.Reject,
            'text-info bg-info-light':
              row.statePropose.name === StatePropose.Pending,
          })}
        >
          {row.statePropose.name ?? 'N/A'}
        </p>
      ),
    },
    {
      accessor: 'note',
      title: 'Lý do',
    },
    {
      accessor: 'action',
      title: '',
      width: 70,
      render: (row: ReviewingProposeProject) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={(
              [StatePropose.Approve, StatePropose.Reject] as ValueOf<
                typeof StatePropose
              >[]
            ).includes(row.statePropose.name as ValueOf<typeof StatePropose>)}
            className="disabled:cursor-not-allowed"
          >
            <Button
              variant="ghost"
              size="icon"
              disabled={(
                [StatePropose.Approve, StatePropose.Reject] as ValueOf<
                  typeof StatePropose
                >[]
              ).includes(row.statePropose.name as ValueOf<typeof StatePropose>)}
              aria-disabled
            >
              <IconEllipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => handleOpenModal('modalAC', { id: row.id })}
            >
              Duyệt
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleOpenModal('modalDN', { id: row.id })}
            >
              Từ chối
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  return (
    <div className="rounded-sm">
      <div className="datatables">
        <DataTable
          noRecordsText="Không có dữ liệu"
          highlightOnHover
          className="table-hover whitespace-nowrap"
          records={data.reviewProposes}
          columns={columns}
          totalRecords={data.totalItems}
          recordsPerPage={parseInt(searchParams.limit)}
          page={parseInt(searchParams.page)}
          onPageChange={(p) => {
            handlePush({ page: p });
          }}
          recordsPerPageOptions={[10, 20, 30, 50, 100]}
          onRecordsPerPageChange={(limit) => {
            handlePush({ limit, page: 1 });
          }}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Từ  ${from} đến ${to} của ${totalRecords}`
          }
        />
      </div>
      <ModalConfirm
        loading={reviewing}
        title="Từ chối đề xuất"
        message={
          <div className="space-y-2">
            <p>Bạn có muốn từ chối đề xuất này?</p>
            <Label required>Lý do</Label>
            <Textarea placeholder="lý do" ref={reasonRef} />
          </div>
        }
        open={modal.modalDN.open}
        onClose={() => handleCloseModal('modalDN')}
        onAccept={() => {
          handleReject(reasonRef.current?.value);
        }}
        msgCTA="Từ chối"
      />
      <ModalConfirm
        loading={reviewing}
        open={modal.modalAC.open}
        title="Duyệt nhân viên tham gia dự án"
        message={
          <div className="space-y-2">
            <p>Bạn có muốn duyệt nhân viên này tham gia dự án?</p>
            <Label required>Lý do</Label>
            <Textarea placeholder="lý do" ref={reasonRef} />
          </div>
        }
        onClose={() => handleCloseModal('modalAC')}
        onAccept={() => {
          handleApprove(reasonRef.current?.value);
        }}
        variant="default"
        msgCTA="Duyệt"
      />
    </div>
  );
};

export default TableDuyetDXNV;
