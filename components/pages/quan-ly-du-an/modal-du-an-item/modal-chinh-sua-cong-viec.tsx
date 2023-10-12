import IconXCircle from '@/components/Icon/IconXCircle';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import dayjs from 'dayjs';

interface IModalDuAn<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const ModalChiTietDauViec = <T,>(props: IModalDuAn<T>) => {
  const { ...rest } = props;
  return (
    <Modal {...rest}>
      <div className="space-y-4">
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
          <Textarea placeholder="mô tả" rows={8} />
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end gap-4">
        <Button variant="outline" onClick={rest.onClose}>
          Đóng
        </Button>
        <Button>Xác nhận</Button>
      </div>
    </Modal>
  );
};

export default ModalChiTietDauViec;
