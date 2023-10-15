import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItemNguonLuc from './item-nguon-luc';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import Search from '@/components/ui/search';

interface IThemNguonLuc {
  scrollAreaProps?: React.ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.Root
  >;
}

const ThemNguonLuc = (props: IThemNguonLuc) => {
  const { scrollAreaProps } = props;
  const { className, ...restScrollAreaProps } = scrollAreaProps ?? {};
  return (
    <div>
      <Tabs className="mb-2">
        <TabsList className="w-full">
          <TabsTrigger className="flex-1" value="vat-tu">
            Vật tư
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="cong-cu">
            Công cụ
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="nguyen-lieu">
            Nguyên liệu
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Search classNameContainer="mb-2" placeholder="tên nguồn lực" />
      <ScrollArea
        className={cn(
          'h-[200px] w-full rounded-md border px-4 py-2',
          className
        )}
        {...restScrollAreaProps}
      >
        {Array(10)
          .fill(0)
          .map((_, idx) => (
            <ItemNguonLuc key={idx} />
          ))}
      </ScrollArea>
    </div>
  );
};

export default ThemNguonLuc;
