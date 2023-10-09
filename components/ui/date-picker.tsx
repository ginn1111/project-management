'use client';

import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.locale('vi');

export const DatePicker = React.forwardRef<Date | undefined>((_, ref) => {
  const [date, setDate] = React.useState<Date>();

  React.useImperativeHandle(ref, () => date);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            dayjs(date).format('ddd - DD/MM/YYYY')
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-auto space-y-2 p-2">
        <div className="rounded-md">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
});

DatePicker.displayName = 'DatePicker';
