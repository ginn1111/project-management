'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BoardDuAn from './board-du-an';
import DuyetDeXuat from './duyet-de-xuat';
import CalendarDauViec from './calendar-dau-viec/calendar-dau-viec';
import NhanVienDuAn from './nhan-vien-du-an';
const QuanLyDuAn = () => {
  return (
    <>
      <Tabs defaultValue="board" className="w-full">
        <TabsList className="w-[100% - 1rem] flex mx-2">
          <TabsTrigger className="flex-1" value="board">
            Đầu việc - Board
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="calendar">
            Đầu việc - Calendar
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="nhan-vien">
            Nhân viên dự án
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="duyet-de-xuat">
            Duyệt đề xuất
          </TabsTrigger>
        </TabsList>
        <TabsContent value="board" className="flex gap-2 overflow-x-auto pt-1">
          <BoardDuAn />
          <BoardDuAn />
          <BoardDuAn />
        </TabsContent>
        <TabsContent
          value="calendar"
          className="flex gap-2 overflow-x-auto mt-0"
        >
          <CalendarDauViec />
        </TabsContent>
        <TabsContent value="nhan-vien" className="mt-0">
          <NhanVienDuAn />
        </TabsContent>
        <TabsContent value="duyet-de-xuat">
          <DuyetDeXuat />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default QuanLyDuAn;
