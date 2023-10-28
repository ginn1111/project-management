'use client';

import useModal from '@/hooks/useModal';
import { useRouter } from 'next/navigation';
import DuAnCard from './du-an-card';
import ModalThemDuAn from './modal/modal-them-du-an';

interface IListDuAn {
  data: { projects: IProject[]; totalItems: number };
}

const ListDuAn = ({ data }: IListDuAn) => {
  const router = useRouter();
  const { modal, handleOpenModal, handleCloseModal } = useModal({
    modalPJ: { open: false, project: {} },
  });
  return (
    <div className="grid grid-cols-fill-300 gap-3 m-2">
      {data.projects.map((project, idx) => (
        <DuAnCard
          key={idx}
          {...project}
          onUpdate={() => handleOpenModal('modalPJ', { project })}
        />
      ))}
      <ModalThemDuAn
        open={modal.modalPJ.open}
        onClose={() => handleCloseModal('modalPJ')}
        title="Thêm dự án mới"
        onRefresh={() => router.refresh()}
        data={modal.modalPJ.project}
        isEdit
      />
    </div>
  );
};

export default ListDuAn;
