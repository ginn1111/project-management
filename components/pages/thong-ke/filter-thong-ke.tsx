'use client';

import IconRefresh from '@/components/Icon/IconRefresh';
import IconSearch from '@/components/Icon/IconSearch';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import useQueryParams from '@/hooks/useQueryParams';
import { useEffect, useState } from 'react';

const FilterThongKe = () => {
	const [dates, setDates] = useState({
		startDate: '',
		finishDate: '',
	});

	const { searchParams, handlePush, handleReset } = useQueryParams({
		initSearchParams: {
			startDate: '',
			finishDate: '',
		},
	});

	useEffect(() => {
		setDates(searchParams as any);
	}, [JSON.stringify(searchParams)]);

	return (
		<div className="flex items-center justify-between gap-4 relative">
			<DatePicker
				placeholder="Ngày bắt đầu"
				value={dates.startDate}
				onChange={(value: any) => setDates({ ...dates, startDate: value })}
			/>
			<DatePicker
				placeholder="Ngày kết thúc"
				value={dates.finishDate}
				onChange={(value: any) => setDates({ ...dates, finishDate: value })}
			/>
			<div className="flex items-center gap-2">
				<Button variant="outline" onClick={() => handleReset()}>
					<IconRefresh />
				</Button>
				<Button
					onClick={() => {
						handlePush({
							...dates,
						});
					}}
				>
					<IconSearch />
				</Button>
			</div>
		</div>
	);
};

export default FilterThongKe;
