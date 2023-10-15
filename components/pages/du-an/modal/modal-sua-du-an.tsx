import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import ReactSelect from '@/components/ui/react-select';
import { Textarea } from '@/components/ui/textarea';

interface IModalSuaDuAn extends Omit<IModalProps, 'children'> {}

const ModalSuaDuAn = (props: IModalSuaDuAn) => {
  const { ...rest } = props;
  return (
    <Modal {...rest}>
      <div className="space-y-4">
        <div>
          <Label>Tên đầu việc</Label>
          <Input placeholder="tên dự án" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Label>Ngày bắt đầu</Label>
            <Input type="datetime-local" />
          </div>
          <div className="flex-1">
            <Label>Ngày hoàn thành dự kiến</Label>
            <Input type="datetime-local" />
          </div>
        </div>
        <ReactSelect
          placeholder="khách hàng"
          title="Khách hàng"
          options={[{ value: 'kh1', label: 'Khách hàng 1' }]}
        />
        <ReactSelect
          placeholder="phòng ban"
          isMulti
          title="Phòng ban"
          options={[
            { value: 'pb1', label: 'Phòng ban 1' },
            { value: 'pb2', label: 'Phòng ban 2' },
          ]}
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

export default ModalSuaDuAn;
