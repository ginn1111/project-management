import ThemNguonLuc from '@/components/special/them-nguon-luc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface IModalTaoDeXuat<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const ModalTaoDeXuat = <T,>(props: IModalTaoDeXuat<T>) => {
  const { data, ...rest } = props;
  return (
    <Modal {...rest}>
      <div className="space-y-4">
        <ThemNguonLuc
          scrollAreaProps={{
            className: 'h-[40vh]',
          }}
        />
        <div>
          <Label>Mô tả</Label>
          <Textarea placeholder="mô tả" rows={5} />
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

export default ModalTaoDeXuat;
