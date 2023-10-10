'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BoardDuAn from './board-du-an';
const QuanLyDuAn = () => {
  return (
    <>
      <Tabs defaultValue="du-an" className="w-full">
        <TabsList className="w-[100% - 1rem] flex mx-2">
          <TabsTrigger className="flex-1" value="du-an">
            Đầu việc dự án
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="nhan-vien">
            Nhân viên dự án
          </TabsTrigger>
        </TabsList>
        <TabsContent value="du-an" className="flex gap-2 overflow-x-auto pt-1">
          <BoardDuAn />
          <BoardDuAn />
          <BoardDuAn />
        </TabsContent>
        <TabsContent value="nhan-vien">Nhan vien</TabsContent>
      </Tabs>
    </>
  );
};

export default QuanLyDuAn;
