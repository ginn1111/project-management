import IconSearch from '@/components/Icon/IconSearch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { ScrollArea } from '@/components/ui/scroll-area';
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
        <div>
          <Label>Tên đầu việc</Label>
          <Input placeholder="tên đầu việc" />
        </div>
        <div>
          <Label>Loại đề xuất</Label>
          <Select>
            <SelectTrigger>
              <SelectValue
                placeholder="loại"
                className="placeholder:text-secondary"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="cong-cu">Công cụ</SelectItem>
                <SelectItem value="vat-tu">Vật tư</SelectItem>
                <SelectItem value="nguyen-lieu">Nguyên liệu</SelectItem>
                <SelectItem value="khac">Khác</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-end justify-between mb-2 gap-4">
            <Label>Nguồn lực</Label>
            <div className="border rounded-md focus:outline overflow-hidden flex items-center gap-2 px-2 focus-within:ring-primary focus-within:ring-2 focus-within:ring-offset-2 flex-1">
              <span className="ml-auto">
                <IconSearch />
              </span>
              <Input
                className="h-[30px] border-none outline-none focus-visible:ring-transparent p-0"
                placeholder="tên nguồn lực"
              />
            </div>
          </div>
          <ScrollArea className="h-[200px] w-full rounded-md border p-2">
            <ItemDeXuat />
            <ItemDeXuat />
            <ItemDeXuat />
            <ItemDeXuat />
            <ItemDeXuat />
          </ScrollArea>
        </div>
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

export default ModalTaoDeXuat;
