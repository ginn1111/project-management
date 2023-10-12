'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BoardDuAn from './board-du-an';
import DuyetDeXuat from './duyet-de-xuat';
const QuanLyDuAn = () => {
  return (
    <>
      <Tabs defaultValue="du-an" className="w-full">
        <TabsList className="w-[100% - 1rem] flex mx-2">
          <TabsTrigger className="flex-1" value="du-an-board">
            Đầu việc dự án (Board)
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="du-an-calendar">
            Đầu việc dự án (Calendar)
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="nhan-vien">
            Nhân viên dự án
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="duyet-de-xuat">
            Duyệt đề xuất
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="du-an-board"
          className="flex gap-2 overflow-x-auto pt-1"
        >
          <BoardDuAn />
          <BoardDuAn />
          <BoardDuAn />
        </TabsContent>
        <TabsContent
          value="du-an-calendar"
          className="flex gap-2 overflow-x-auto pt-1"
        >
          Calendar
        </TabsContent>
        <TabsContent value="nhan-vien">Nhan vien</TabsContent>
        <TabsContent value="duyet-de-xuat">
          <DuyetDeXuat />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default QuanLyDuAn;
