import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';

interface IModalChinhSuaDauViec<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const ModalChinhSuaDauViec = <T,>(props: IModalChinhSuaDauViec<T>) => {
  const { ...rest } = props;
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
            className="form-input"
            defaultValue={new Date().toISOString()}
          />
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

export default ModalChinhSuaDauViec;
