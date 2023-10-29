import FilterDuAn from '@/components/pages/du-an/filter-du-an';
import ListDuAn from '@/components/pages/du-an/list-du-an';
import { ProjectServices } from '@/lib';

const DuAn = async ({
  searchParams,
}: {
  searchParams: ISearchParams & {
    startDate?: string;
    finishDateET?: string;
    idDepartment?: string;
  };
}) => {
  const projectListData = await ProjectServices.getList(
    `search=${searchParams.search ?? ''}&startDate=${
      searchParams.startDate ?? ''
    }&finishDateET=${searchParams.finishDateET ?? ''}&idDepartment=${
      searchParams.idDepartment ?? ''
    }`
  );
  return (
    <div>
      <FilterDuAn />
      <ListDuAn data={projectListData.data} />
    </div>
  );
};

export default DuAn;
