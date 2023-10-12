import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { ReactNode } from 'react';

interface IModalTaoCongViec<T> extends Omit<IModalProps, 'children'> {
  open: boolean;
  data: T;
  title: ReactNode;
  onClose: () => void;
}

const ModalTaoCongViec = <T,>(props: IModalTaoCongViec<T>) => {
  const { data, ...rest } = props;
  return (
    <Modal {...rest}>
      <div>
        <Label>Tên công việc</Label>
        <Input placeholder="tên công việc" />
      </div>
      <div>
        <Label>Ngày bắt đầu</Label>
        <Input type="datetime-local" />
      </div>
      <div>
        <Label>Ngày hoàn thành dự kiến</Label>
        <Input type="datetime-local" />
      </div>
      <div>
        <Label>Mô tả</Label>
        <Textarea placeholder="Mô tả" rows={5} />
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

export default ModalTaoCongViec;
