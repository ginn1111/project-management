import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ItemNguonLuc = () => {
  return (
    <div className="flex items-center gap-4 my-4">
      <Checkbox />
      <Label className="mb-0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, iusto.
      </Label>
      <Input
        placeholder="số lượng"
        type="number"
        className="inline-block min-w-[100px] w-1/2 mr-2 h-[30px] text-[13px]"
      />
    </div>
  );
};

export default ItemNguonLuc;
