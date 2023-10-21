import FilterPhongBan from '@/components/pages/quan-ly-phong-ban/filter-phong-ban';
import TablePhongBan from '@/components/pages/quan-ly-phong-ban/table-phong-ban';
import { DepartmentServices } from '@/lib';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const PhongBan = async ({ searchParams }: { searchParams: ISearchParams }) => {
  const departmentData = await DepartmentServices.getList(
    `page=${(parseInt(searchParams.page as any) || 1) - 1}&limit=${
      parseInt(searchParams.limit as any) || 10
    }&search=${searchParams.search ?? ''}`
  );
  return (
    <div className="m-2 rounded-sm p-2">
      <FilterPhongBan />
      <div className="mt-4">
        <TablePhongBan data={departmentData.data} />
      </div>
    </div>
  );
};

export default PhongBan;
