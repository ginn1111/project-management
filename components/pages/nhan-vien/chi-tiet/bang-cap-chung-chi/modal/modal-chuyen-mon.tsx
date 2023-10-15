import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import ReactSelect from '@/components/ui/react-select';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const ModalChuyenMon = (props: Omit<IModalProps, 'children'>) => {
  const { data, ...rest } = props;
  return (
    <Modal {...rest}>
      <div className="space-y-4">
        <ReactSelect
          title="Phòng ban"
          options={[{ value: 'PB', label: 'PB1' }]}
          isDisabled
        />
        <div>
          <Label>Tên chuyên môn</Label>
          <Input placeholder="tên chuyên môn" />
        </div>
        <div>
          <Label>Ghi chú</Label>
          <Textarea placeholder="ghi chú" rows={10} />
        </div>
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

export default ModalChuyenMon;
