import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import ReactSelect from '@/components/ui/react-select';
import { ScrollArea } from '@/components/ui/scroll-area';

interface IModalPhanQuyen<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const ModalPhanQuyen = <T,>(props: IModalPhanQuyen<T>) => {
  const { data, ...rest } = props;
  return (
    <Modal {...rest}>
      <ReactSelect
        title="Phòng ban"
        options={[
          { label: 'pb1', value: 'pb1' },
          { label: 'pb2', value: 'pb2' },
        ]}
      />
      <ReactSelect
        title="Nhân viên"
        options={[
          { label: 'nv1', value: 'nv1' },
          { label: 'nv2', value: 'nv2' },
        ]}
        className="!outline-none !border-none"
      />

      <Label className="mb-0">Quyền</Label>
      <ScrollArea className="h-[200px] w-full rounded-md border p-2">
        <div className="flex items-center gap-4 my-4">
          <Checkbox />
          <Label className="mb-0">Q1</Label>
        </div>
        <div className="flex items-center gap-4 my-4">
          <Checkbox />
          <Label className="mb-0">Q1</Label>
        </div>
        <div className="flex items-center gap-4 my-4">
          <Checkbox />
          <Label className="mb-0">Q1</Label>
        </div>
        <div className="flex items-center gap-4 my-4">
          <Checkbox />
          <Label className="mb-0">Q1</Label>
        </div>
        <div className="flex items-center gap-4 my-4">
          <Checkbox />
          <Label className="mb-0">Q1</Label>
        </div>
        <div className="flex items-center gap-4 my-4">
          <Checkbox />
          <Label className="mb-0">Q1</Label>
        </div>
      </ScrollArea>

      <div className="flex items-center justify-end gap-4 mt-4">
        <Button onClick={rest.onClose} variant="outline">
          Đóng
        </Button>
        <Button>Xác nhận</Button>
      </div>
    </Modal>
  );
};

export default ModalPhanQuyen;
