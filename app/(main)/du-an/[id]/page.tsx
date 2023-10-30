import QuanLyDuAn from '@/components/pages/quan-ly-du-an';
import {
  EmployeeProjectServices,
  ResourceProjectServices,
  ProposeResourceServices,
  WorkProjectServices,
} from '@/lib';
import { AxiosResponse } from 'axios';

type Tab =
  | 'works-board'
  | 'works-calendar'
  | 'employee'
  | 'propose'
  | 'resource';

const getData: Record<
  Tab,
  (idProject: string, payload?: any) => Promise<AxiosResponse>
> = {
  'works-board': (idProject: string) =>
    WorkProjectServices.getList({ idProject }),
  'works-calendar': (idProject: string) =>
    WorkProjectServices.getList({ idProject }),
  employee: (idProject: string, searchParams: string) =>
    EmployeeProjectServices.getList({ idProject, searchParams }),
  propose: (idProject: string, searchParams: string) =>
    ProposeResourceServices.getList({ idProject, searchParams }),
  resource: (idProject: string, searchParams: string) =>
    ResourceProjectServices.getList({ idProject, searchParams }),
};

const DuAn = async ({
  params,
  searchParams,
}: IRouterParams<
  { id: string },
  {
    tab?: Tab;
    page?: string;
    limit?: string;
  }
>) => {
  const { id } = params;
  const { tab } = searchParams;
  const data = await getData[tab ?? 'works-board']?.(
    id,
    `page=${(parseInt(searchParams.page as any) || 1) - 1}&limit=${
      parseInt(searchParams.limit as any) || 10
    }`
  );

  return (
    <div className="flex overflow-x-auto">
      <QuanLyDuAn data={data?.data} />
    </div>
  );
};

export default DuAn;
