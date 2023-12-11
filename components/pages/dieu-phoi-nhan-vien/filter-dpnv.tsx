'use client';

import IconPlus from '@/components/Icon/IconPlus';
import IconRefresh from '@/components/Icon/IconRefresh';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Search from '@/components/ui/search';
import { Role } from '@/constants/general';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ModalDieuPhoi from './modal-dieu-phoi';
import { DatePicker } from '@/components/ui/date-picker';

const FilterDPNV = () => {
	const { handlePush, handleReset, searchParams } = useQueryParams({
		initSearchParams: {
			finishDate: '',
			startDate: '',
		},
	});
	const { data: session } = useSession();
	const { user } = session ?? {};

	const [filter, setFilter] = useState({ ...searchParams });

	const { handleCloseModal, handleOpenModal, modal } = useModal({
		modalDP: { open: false },
	});

	useEffect(() => {
		const timerId = setTimeout(() => {
			const startDateJs = dayjs(filter.startDate);
			const finishDateJs = dayjs(filter.finishDate);
			if (
				startDateJs.isValid() &&
				finishDateJs.isValid() &&
				!startDateJs.isAfter(finishDateJs)
			) {
				handlePush({
					startDate: startDateJs.format('YYYY-MM-DD'),
					finishDate: finishDateJs.format('YYYY-MM-DD'),
				});
			}
		}, 300);

		return () => clearTimeout(timerId);
	}, [JSON.stringify(filter)]);

	return (
		<div className="flex items-center justify-end gap-4 m-2">
			<div className="flex items-center gap-2 flex-1">
				<DatePicker
					placeholder="Ngày bắt đầu"
					value={filter.startDate}
					onChange={(e: any) => setFilter((old) => ({ ...old, startDate: e }))}
				/>
				<DatePicker
					placeholder="Ngày kết thúc dự kiến"
					value={filter.finishDate}
					onChange={(e: any) => setFilter((old) => ({ ...old, finishDate: e }))}
				/>
			</div>
			<Button
				className="items-center gap-2"
				onClick={() => handleOpenModal('modalDP')}
			>
				Điều phối nhân viên
			</Button>
			<Button
				variant="outline"
				className="items-center gap-2"
				onClick={() => {
					handleReset();
					setFilter({
						startDate: '',
						finishDate: '',
					});
				}}
			>
				<IconRefresh />
			</Button>

			<ModalDieuPhoi
				title="Điều phối nhân viên"
				open={modal.modalDP.open}
				onClose={() => handleCloseModal('modalDP')}
			/>
		</div>
	);
};

export default FilterDPNV;
