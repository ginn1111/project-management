import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const ModalThemChungChi = (props: Omit<IModalProps, 'children'>) => {
  const { data, ...rest } = props;
  return (
    <Modal {...rest}>
      <div className="space-y-4">
        <div>
          <Label>Tên chứng chỉ</Label>
          <Input placeholder="tên chứng chỉ" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Label>Ngày cấp</Label>
            <Input type="date" className="ngày cấp" />
          </div>
          <div className="flex-1">
            <Label>Ngày hết hạn</Label>
            <Input type="date" className="ngày hêt hạn" />
          </div>
        </div>
        <div>
          <Label>Hình ảnh chứng chỉ</Label>
          <Input type="file" className="hình ảnh chứng chỉ" />
        </div>
        <div>
          <Label>Ghi chú</Label>
          <Textarea placeholder="ghi chú" />
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

export default ModalThemChungChi;
