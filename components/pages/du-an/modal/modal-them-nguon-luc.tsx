import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import ReactSelect from '@/components/ui/react-select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface IModalThemNguonLuc<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const ModalThemNguonLuc = <T,>(props: IModalThemNguonLuc<T>) => {
  const { data, ...rest } = props;
  return (
    <Modal {...rest}>
      <div className="space-y-4">
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
      <div className="items-center justify-end gap-4 flex mt-2">
        <Button variant="outline" onClick={rest.onClose}>
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

export default ModalThemNguonLuc;
