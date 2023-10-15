import { Button } from '@/components/ui/button';
import Modal, { IModalProps } from '@/components/ui/modal';
import ReactSelect from '@/components/ui/react-select';
import React from 'react';

const ModalGiaoViec = <T,>(props: Omit<IModalProps<T>, 'children'>) => {
  const { ...rest } = props;
  return (
    <Modal {...rest}>
      <div className="min-h-[100px]">
        <ReactSelect
          placeholder="đầu việc"
          title="Đầu việc"
          options={[
            {
              label: 'Đầu việc 1',
              value: 'DAU_VIEC_1',
            },
            {
              label: 'Đầu việc 2',
              value: 'DAU_VIEC_2',
            },
          ]}
        />
      </div>

      <div className="flex items-center justify-end gap-4 mt-4">
        <Button onClick={rest.onClose} variant="outline">
          Đóng
        </Button>
        <Button>Xác nhận</Button>
      </div>
    </Modal>
  );
};

export default ModalGiaoViec;
