import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const ModalThemBangCap = (
  props: Omit<IModalProps, 'children'> & { isEdit?: boolean }
) => {
  const { isEdit, data, ...rest } = props;
  return (
    <Modal {...rest} title={`${isEdit ? 'Chỉnh sửa' : 'Thêm'} ${rest.title}`}>
      <div className="space-y-4">
        <div>
          <Label>Tên bằng cấp</Label>
          <Input placeholder="tên bằng cấp" />
        </div>
        <div>
          <Label>Ngày cấp</Label>
          <Input type="date" className="ngày cấp" />
        </div>
        <div>
          <Label>Hình ảnh bằng cấp</Label>
          <Input type="file" className="hình ảnh bằng cấp" />
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

export default ModalThemBangCap;
