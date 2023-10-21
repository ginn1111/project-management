import FilterTaiKhoan from '@/components/pages/quan-ly-tai-khoan/filter-tai-khoan';
import TableTaiKhoan from '@/components/pages/quan-ly-tai-khoan/table-tai-khoan';
import { AccountServices } from '@/lib';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const PhongBan = async ({ searchParams }: { searchParams: ISearchParams }) => {
  const accountData = await AccountServices.getList(
    `page=${(parseInt(searchParams.page as any) || 1) - 1}&limit=${
      parseInt(searchParams.limit as any) || 10
    }&search=${searchParams.search ?? ''}`
  );
  return (
    <div className="m-2 rounded-sm p-2">
      <FilterTaiKhoan />
      <div className="mt-4">
        <TableTaiKhoan data={accountData.data} />
      </div>
    </div>
  );
};

export default PhongBan;
