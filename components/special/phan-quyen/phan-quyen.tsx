import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import ItemPhanQuyen from './item-phan-quyen';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';

const PhanQuyen = (
  props: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
) => {
  const { className, ...restProps } = props;
  return (
    <ScrollArea
      className={cn('h-[200px] w-full rounded-md border p-2', className)}
      {...restProps}
    >
      {Array(20)
        .fill(0)
        .map((_, idx) => (
          <ItemPhanQuyen key={idx} />
        ))}
    </ScrollArea>
  );
};

export default PhanQuyen;
