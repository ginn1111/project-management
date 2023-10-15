import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
      <div className="flex gap-4 min-w-[70vw]">
        <div className="min-w-[30vw] flex flex-col gap-4">
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
        </div>

        <div className="space-y-4 mt-5">
          <Tabs>
            <TabsList>
              <TabsTrigger value="vat-tu">Vật tư</TabsTrigger>
              <TabsTrigger value="cong-cu">Công cụ</TabsTrigger>
              <TabsTrigger value="nguyen-lieu">Nguyên liệu</TabsTrigger>
            </TabsList>
          </Tabs>
          <ScrollArea className="h-[65vh] w-full rounded-md border p-2">
            <ItemDeXuat />
            <ItemDeXuat />
            <ItemDeXuat />
            <ItemDeXuat />
            <ItemDeXuat />
          </ScrollArea>
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

const ItemDeXuat = () => {
  return (
    <div className="flex items-center gap-4 my-4">
      <Checkbox />
      <Label className="mb-0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, esse!
        Repellendus illo consequatur eum ad labore! Assumenda maxime fuga
        mollitia inventore illo vitae nihil facere porro eligendi saepe! Eum,
        cum!
      </Label>
      <Input
        placeholder="số lượng"
        type="number"
        className="inline-block min-w-[100px] w-1/2 mr-2 h-[30px] text-[13px]"
      />
    </div>
  );
};

export default ModalTaoCongViec;
