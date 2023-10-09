import IconClock from '@/components/Icon/IconClock';
import IconDetail from '@/components/Icon/IconDetail';
import IconEllipsis from '@/components/Icon/IconEllipsis';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

const LABEL_COLOR = {
  // new: 'bg-success',
  progress: 'bg-primary',
  done: 'bg-info',
  failed: 'bg-danger',
} as const;

const LABEL: { [k in keyof typeof LABEL_COLOR]: string } = {
  progress: 'Đang thực hiện',
  done: 'Đã hoàn thành',
  failed: 'Quá hạn',
};

type BoardDuAnItemProps = {
  status: keyof typeof LABEL_COLOR;
  title: ReactNode;
  progress: number;
};

const BoardDuAnItem = (props: BoardDuAnItemProps) => {
  const { status, title, progress } = props;
  return (
    <li className="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light p-5 justify-start">
      <div className="flex justify-between mb-5 items-center">
        <h6 className="text-black font-semibold text-base dark:text-white-light">
          {title}
        </h6>
        <span
          className={cn(
            'uppercase badge bg-primary/10 py-1.5',
            LABEL_COLOR[status]
          )}
        >
          {LABEL[status]}
        </span>
      </div>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo,
        similique quisquam quasi laborum rerum sed quaerat facilis ex magnam
        voluptates iste impedit labore repellat quia! Dolores explicabo est
        aspernatur aperiam.
      </p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center rounded-full bg-danger/20 px-2 py-1 text-xs font-semibold text-danger w-max">
          <IconClock className="w-3 h-3 mr-1" />3 Days Left
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">
              <IconEllipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
            <DropdownMenuItem>Chi tiết</DropdownMenuItem>
            <DropdownMenuItem>Phân quyền</DropdownMenuItem>
            <DropdownMenuItem>Lịch sử</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
};

export default BoardDuAnItem;
