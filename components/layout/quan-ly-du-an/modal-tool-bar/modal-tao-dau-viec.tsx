import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

interface IModalTaoDauViec<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const ModalTaoDauViec = <T,>(props: IModalTaoDauViec<T>) => {
  const { data, ...rest } = props;
  return (
    <Modal {...rest}>
      <div className="space-y-4">
        <div>
          <Label>Tên đầu việc</Label>
          <Input placeholder="tên đầu việc" />
        </div>
        <div>
          <Label>Ngày bắt đầu</Label>
          <input
            type="datetime-local"
            name="end"
            className="form-input"
            placeholder="Event End Date"
            defaultValue={new Date().toISOString()}
            min={new Date().toISOString()}
          />
        </div>
        <div>
          <Label>Ngày hoàn thành dự kiến</Label>
          <input
            id="end"
            type="datetime-local"
            name="end"
            className="form-input"
            placeholder="Event End Date"
            required
          />
        </div>
        <div>
          <Label>Mô tả</Label>
          <Textarea placeholder="mô tả" rows={10} />
        </div>
      </div>
      <div className="items-center justify-end gap-4 flex mt-2">
        <Button variant="outline" onClick={rest.onClose}>
          Đóng
        </Button>
        <Button>Xác nhận</Button>
      </div>
    </Modal>
  );
};

export default ModalTaoDauViec;
