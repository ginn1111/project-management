import { Button } from '@/components/ui/button';
import Modal, { IModalProps } from '@/components/ui/modal';
import ReactSelect from '@/components/ui/react-select';
import React from 'react';

const ModalDanhGia = <T,>(props: Omit<IModalProps<T>, 'children'>) => {
  const { data, ...rest } = props;
  return (
    <Modal {...rest}>
      <ReactSelect
        title="Đánh giá đầu việc"
        placeholder="mức độ"
        options={[
          {
            label: 'Tốt',
            value: 'TOT',
          },
          {
            label: 'Khá',
            value: 'KHA',
          },
          {
            label: 'TB',
            value: 'TB',
          },
        ]}
      />

      <div className="flex items-center justify-end gap-4 mt-4">
        <Button onClick={rest.onClose} variant="outline">
          Đóng
        </Button>
        <Button>Xác nhận</Button>
      </div>
    </Modal>
  );
};

export default ModalDanhGia;
