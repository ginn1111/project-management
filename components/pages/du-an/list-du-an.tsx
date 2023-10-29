'use client';

import useModal from '@/hooks/useModal';
import { useRouter } from 'next/navigation';
import DuAnCard from './du-an-card';
import ModalThemDuAn from './modal/modal-them-du-an';
import ModalThemNguonLuc from './modal/modal-them-nguon-luc';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ReactNode, useRef } from 'react';
import { toast } from 'sonner';
import { useMutation } from 'react-query';
import { ProjectServices } from '@/lib';
import { AxiosError } from 'axios';

interface IListDuAn {
  data: { projects: IProject[]; totalItems: number };
}

const ListDuAn = ({ data }: IListDuAn) => {
  const router = useRouter();
  const { modal, handleOpenModal, handleCloseModal } = useModal({
    modalPJ: { open: false, project: {} },
    modalRS: { open: false, project: { id: '' } },
    modalPP: {
      open: false,
      payload: { idEmployee: '', idProject: '', content: '' },
    },
  });

  const { mutate: proposeProject, isLoading } = useMutation({
    mutationFn: ProjectServices.proposeProject,
    onSuccess: () => {
      toast.success('Đề xuất tham gia dự án thành công');
    },
    onError: (error: AxiosError) => {
      toast.error(error.response?.data as ReactNode);
    },
    onSettled: () => {
      handleCloseModal('modalPP');
    },
  });

  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const handlePropose = () => {
    if (!contentRef.current?.value) {
      toast.error('Vui lòng nhập lời nhắn để đề xuất');
      return;
    }
    const payload = {
      ...modal.modalPP.payload,
      content: contentRef.current.value,
    };
    proposeProject(payload);
  };

  return (
    <div className="grid grid-cols-fill-300 gap-3 m-2">
      {data.projects.map((project, idx) => (
        <DuAnCard
          key={idx}
          {...project}
          onUpdate={() => handleOpenModal('modalPJ', { project })}
          onAddResource={() => handleOpenModal('modalRS', { project })}
          // TODO
          // hardcode for idEmployee, update late
          onPropose={() =>
            handleOpenModal('modalPP', {
              payload: {
                idEmployee: 'EMPL_01HCYJHDATA3XECHSYBBPNF28K',
                idProject: project.id,
              },
            })
          }
        />
      ))}

      <ModalThemNguonLuc
        title="Thêm nguồn lực"
        open={modal.modalRS.open}
        data={modal.modalRS.project}
        onClose={() => handleCloseModal('modalRS')}
        onRefresh={() => router.refresh()}
      />
      <ModalThemDuAn
        open={modal.modalPJ.open}
        onClose={() => handleCloseModal('modalPJ')}
        title="Thêm dự án mới"
        onRefresh={() => router.refresh()}
        data={modal.modalPJ.project}
        isEdit
      />

      <ModalConfirm
        loading={isLoading}
        open={modal.modalPP.open}
        title="Đề xuất tham gia dự án"
        message={
          <>
            <p className="text-md mb-2">
              Bạn có chắc chắn muốn đề xuất tham gia vào dự án này?
            </p>
            <Label>Lời nhắn</Label>
            <Textarea ref={contentRef} placeholder="lời nhắn" />
          </>
        }
        onAccept={handlePropose}
        onClose={() => handleCloseModal('modalPP')}
        variant="default"
        msgCTA="Xác nhận"
      />
    </div>
  );
};

export default ListDuAn;
