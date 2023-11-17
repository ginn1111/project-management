'use client';

import IconRefresh from '@/components/Icon/IconRefresh';
import IconSearch from '@/components/Icon/IconSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useQueryParams from '@/hooks/useQueryParams';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FilterThongKe = () => {
	const form = useForm();
	const { register } = form;
	const { searchParams, handlePush, handleReset } = useQueryParams({
		initSearchParams: {
			startDate: '',
			finishDate: '',
		},
	});

	useEffect(() => {
		form.reset(searchParams);
	}, [JSON.stringify(searchParams)]);

	return (
		<div className="flex items-center justify-between gap-4 relative">
			<Input type="date" {...register('startDate')} />
			<Input type="date" {...register('finishDate')} />
			<div className="flex items-center gap-2">
				<Button variant="outline" onClick={() => handleReset()}>
					<IconRefresh />
				</Button>
				<Button
					onClick={() => {
						handlePush({
							...form.getValues(),
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
