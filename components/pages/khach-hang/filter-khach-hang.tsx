'use client';

import IconRefresh from '@/components/Icon/IconRefresh';
import IconUserPlus from '@/components/Icon/IconUserPlus';
import { Button } from '@/components/ui/button';
import Search from '@/components/ui/search';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ModalThemKhachHang from './modal/modal-them-khach-hang';

const FilterKhachHang = () => {
	const router = useRouter();
	const { handlePush, handleReset, searchParams } = useQueryParams({
		initSearchParams: { search: '', page: 1, limit: 10 },
	});
	const { modal, handleOpenModal, handleCloseModal } = useModal({
		modalKH: { open: false },
	});

	const [searchValue, setSearchValue] = useState(searchParams.search);

	useEffect(() => {
		setSearchValue(searchParams.search);
	}, [searchParams.search]);

	useEffect(() => {
		const timerId = setTimeout(() => {
			handlePush({ search: searchValue ?? '', page: 1 });
		}, 300);

		return () => clearTimeout(timerId);
	}, [searchValue]);

	return (
		<div className="flex items-center gap-4">
			<div className="flex items-center gap-4 flex-1">
				<Button size="icon" onClick={() => handleOpenModal('modalKH')}>
					<IconUserPlus />
				</Button>
				<Search
					placeholder="họ tên, số điện thoại, cmnd/ ccccd"
					classNameContainer="w-full"
					value={searchValue}
					onChange={(e) => {
						setSearchValue(e.target.value);
					}}
				/>
			</div>
			<Button
				variant="outline"
				onClick={() => {
					handleReset();
					setSearchValue('');
				}}
			>
				<IconRefresh />
			</Button>
			<ModalThemKhachHang
				title="Thêm nhân khách hàng mới"
				onClose={() => handleCloseModal('modalKH')}
				open={modal.modalKH.open}
				onRefresh={() => {
					router.refresh();
				}}
			/>
		</div>
	);
};

export default FilterKhachHang;
