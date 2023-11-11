'use client';

import IconAuthenTool from '@/components/Icon/IconAuthenTool';
import IconRecommend from '@/components/Icon/IconRecommend';
import IconWork from '@/components/Icon/IconWork';
import { Button } from '@/components/ui/button';

import LoadingInline from '@/components/ui/loading/loading-inline';
import { QueryKeys } from '@/constants/query-key';
import useModal from '@/hooks/useModal';
import { ProjectServices } from '@/lib';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import ModalPhanQuyenDA from './modal-tool-bar/modal-phan-quyen-da';
import ModalTaoDauViec from './modal-tool-bar/modal-tao-dau-viec';
import ModalTaoDeXuat from './modal-tool-bar/modal-tao-de-xuat';

const LayoutQLDA = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const { user } = session ?? {};
	const { id } = useParams();
	const { data: projectData, isFetching } = useQuery({
		queryKey: QueryKeys.getDetailProject(id as string),
		queryFn: ({ queryKey }) => ProjectServices.getDetail(queryKey[1]),
	});

	const { data: isInProjectData, isFetching: isFetchingInfoPrj } = useQuery({
		queryKey: QueryKeys.isInProject(id as string),
		queryFn: ({ queryKey }) => ProjectServices.inProject(queryKey[1]),
		enabled: !!id,
	});

	const { modal, handleCloseModal, handleOpenModal } = useModal({
		modalTDV: { open: false, idProject: '' },
		modalPQDA: { open: false },
		modalTDX: { open: false },
	});

	const isHeadOrCreator = isInProjectData?.data?.isHeadOrCreator;

	return (
		<div className="p-2 rounded-md bg-primary2-light m-2 flex items-center gap-2 justify-end sticky top-2 z-10">
			{isFetching || isFetchingInfoPrj ? <LoadingInline /> : null}
			{isHeadOrCreator ? (
				<Button
					variant="outline"
					size="sm"
					onClick={() => handleOpenModal('modalTDV', { idProject: id })}
				>
					<IconWork />
					<span className="ml-2">Tạo đầu việc</span>
				</Button>
			) : null}
			{isHeadOrCreator ? (
				<Button
					variant="outline"
					size="sm"
					onClick={() => handleOpenModal('modalPQDA')}
				>
					<IconAuthenTool />
					<span className="ml-2">Phân quyền dự án</span>
				</Button>
			) : null}
			{!isHeadOrCreator ? (
				<Button variant="outline" onClick={() => handleOpenModal('modalTDX')}>
					<IconRecommend />
					<span className="ml-2">Tạo đề xuất</span>
				</Button>
			) : null}
			<ModalPhanQuyenDA
				title="Phân quyền dự án"
				open={modal.modalPQDA.open}
				data={{}}
				onClose={() => handleCloseModal('modalPQDA')}
			/>
			<ModalTaoDeXuat
				title="Tạo đề xuất"
				open={modal.modalTDX.open}
				data={{}}
				onClose={() => handleCloseModal('modalTDX')}
				onRefresh={() => router.refresh()}
			/>
			<ModalTaoDauViec
				title="Thêm đầu việc"
				open={modal.modalTDV.open}
				data={{
					...modal.modalTDV,
					finishDateETProject: projectData?.data.finishDateET,
				}}
				onClose={() => handleCloseModal('modalTDV')}
				onRefresh={() => router.refresh()}
			/>
		</div>
	);
};

export default LayoutQLDA;
