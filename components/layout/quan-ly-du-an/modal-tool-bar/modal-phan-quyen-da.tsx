import GroupSelectNhanVien from '@/components/special/group-select-nhan-vien';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { ScrollArea } from '@/components/ui/scroll-area';

interface IModalPhanQuyenDA<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const ModalPhanQuyenDA = <T,>(props: IModalPhanQuyenDA<T>) => {
  const { data, ...rest } = props;
  return (
    <Modal {...rest}>
      <div className="space-y-4">
        <GroupSelectNhanVien />
        <div className="space-y-2">
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

export default ModalPhanQuyenDA;
