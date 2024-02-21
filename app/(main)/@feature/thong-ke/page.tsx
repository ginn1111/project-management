import ChartThongKe from '@/components/pages/thong-ke/chart-thong-ke';
import FilterThongKe from '@/components/pages/thong-ke/filter-thong-ke';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const ThongKe = () => {
	return (
		<div className="m-2 rounded-sm p-2">
			<FilterThongKe />
			<div className="mt-4">
				<ChartThongKe />
			</div>
		</div>
	);
};

export default ThongKe;
