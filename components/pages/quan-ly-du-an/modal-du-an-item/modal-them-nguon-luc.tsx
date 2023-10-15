import ThemNguonLuc from '@/components/special/them-nguon-luc';
import { Button } from '@/components/ui/button';
import Modal, { IModalProps } from '@/components/ui/modal';
import React from 'react';

const ModalThemNguonLuc = (props: Omit<IModalProps, 'children'>) => {
  const { ...rest } = props;
  return (
    <Modal {...rest}>
      <ThemNguonLuc scrollAreaProps={{ className: 'h-[65vh]' }} />
      <div className="flex items-center justify-end gap-4 mt-4">
        <Button onClick={rest.onClose} variant="outline">
          Đóng
        </Button>
        <Button>Xác nhận</Button>
      </div>
    </Modal>
  );
};

export default ModalThemNguonLuc;
