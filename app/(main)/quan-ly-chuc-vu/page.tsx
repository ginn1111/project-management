import FilterChucVu from '@/components/pages/quan-ly-chuc-vu/filter-chuc-vu';
import TableChucVu from '@/components/pages/quan-ly-chuc-vu/table-chuc-vu';
import { PositionServices } from '@/lib';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const ChucVu = async ({ searchParams }: { searchParams: ISearchParams }) => {
  const positionData = await PositionServices.getList(
    `page=${(parseInt(searchParams.page as any) || 1) - 1}&limit=${
      parseInt(searchParams.limit as any) || 10
    }&search=${searchParams.search ?? ''}`
  );
  return (
    <div className="m-2 rounded-sm p-2">
      <FilterChucVu />
      <div className="mt-4">
        <TableChucVu data={positionData.data} />
      </div>
    </div>
  );
};

export default ChucVu;
