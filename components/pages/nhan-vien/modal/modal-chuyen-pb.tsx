import { Button } from '@/components/ui/button';
import Modal, { IModalProps } from '@/components/ui/modal';
import ReactSelect from '@/components/ui/react-select';
import React from 'react';

const ModalChuyenPB = (props: Omit<IModalProps, 'children'>) => {
  const { data, ...rest } = props;
  return (
    <Modal {...rest}>
      <div className="space-y-4">
        <ReactSelect
          isDisabled
          title="Phòng ban hiện tại"
          options={[{ label: 'PB1', value: 'PB1' }]}
        />
        <ReactSelect
          title="Phòng ban được chuyển đến"
          options={[{ label: 'PB1', value: 'PB1' }]}
          placeholder="phòng ban mới"
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

export default ModalChuyenPB;
