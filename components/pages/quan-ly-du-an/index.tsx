'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BoardDuAn from './board-du-an';
import DuyetDeXuat from './duyet-de-xuat';
import CalendarDauViec from './calendar-dau-viec/calendar-dau-viec';
import NhanVienDuAn from './nhan-vien-du-an';
import NguonLuc from './nguon-luc';
import useQueryParams from '@/hooks/useQueryParams';

interface IQuanLyDuAn {
  data: { data: unknown[]; totalItems: number } | unknown[];
}

const QuanLyDuAn = (props: IQuanLyDuAn) => {
  const { data } = props;
  const { handlePush, searchParams } = useQueryParams({
    initSearchParams: {
      tab: 'works-board',
    },
  });

  console.log(data);

  const tabs = {
    isWorkBoard: searchParams.tab === 'works-board',
    isWorkCalendar: searchParams.tab === 'works-calendar',
    isEmployee: searchParams.tab === 'employee',
    isPropose: searchParams.tab === 'propose',
    isResource: searchParams.tab === 'resource',
  };

  return (
    <>
      <Tabs className="w-full" defaultValue={searchParams.tab}>
        <TabsList className="w-[100% - 1rem] flex mx-2">
          <TabsTrigger
            className="flex-1"
            value="works-board"
            onClick={() => handlePush({ tab: 'works-board' })}
          >
            Đầu việc - Board
          </TabsTrigger>
          <TabsTrigger
            className="flex-1"
            value="works-calendar"
            onClick={() => handlePush({ tab: 'works-calendar' })}
          >
            Đầu việc - Calendar
          </TabsTrigger>
          <TabsTrigger
            className="flex-1"
            value="employee"
            onClick={() => handlePush({ tab: 'employee' })}
          >
            Nhân viên dự án
          </TabsTrigger>
          <TabsTrigger
            className="flex-1"
            value="propose"
            onClick={() => handlePush({ tab: 'propose' })}
          >
            Duyệt đề xuất
          </TabsTrigger>
          <TabsTrigger
            className="flex-1"
            value="resource"
            onClick={() => handlePush({ tab: 'resource' })}
          >
            Nguồn lực
          </TabsTrigger>
        </TabsList>
        {tabs.isWorkBoard ? (
          <TabsContent
            value="works-board"
            className="flex gap-2 overflow-x-auto pt-1"
          >
            {(data as IWorkProject[])?.map((workPj) => (
              <BoardDuAn {...workPj} key={workPj.idWork} />
            ))}
          </TabsContent>
        ) : null}
        {tabs.isWorkCalendar ? (
          <TabsContent
            value="works-calendar"
            className="flex gap-2 overflow-x-auto"
          >
            <CalendarDauViec />
          </TabsContent>
        ) : null}
        {tabs.isEmployee ? (
          <TabsContent value="employee">
            <NhanVienDuAn data={data as any} />
          </TabsContent>
        ) : null}
        {tabs.isPropose ? (
          <TabsContent value="propose">
            <DuyetDeXuat />
          </TabsContent>
        ) : null}
        {tabs.isResource ? (
          <TabsContent value="resource">
            <NguonLuc />
          </TabsContent>
        ) : null}
      </Tabs>
    </>
  );
};

export default QuanLyDuAn;
