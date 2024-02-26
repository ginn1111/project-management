import FilterDuAn from '@/components/pages/du-an/filter-du-an';
import Loading from '@/components/ui/loading/loading-inline';
import { Suspense } from 'react';
import ListDuAnPage from './_list-du-an';

const DuAn = async ({
	searchParams,
}: {
	searchParams: ISearchParams & {
		startDate?: string;
		finishDateET?: string;
		idDepartment?: string;
	};
}) => {
	return (
		<div>
			<FilterDuAn />
			<Suspense fallback={<Loading />}>
				<ListDuAnPage searchParams={searchParams} />
			</Suspense>
		</div>
	);
};

export default DuAn;
