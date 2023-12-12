'use client';

import IconAuthenTool from '@/components/Icon/IconAuthenTool';
import IconRecommend from '@/components/Icon/IconRecommend';
import IconWork from '@/components/Icon/IconWork';
import { Button } from '@/components/ui/button';

import IconChecks from '@/components/Icon/IconChecks';
import IconDesign from '@/components/Icon/IconDesign';
import IconEditTwoTone from '@/components/Icon/IconEditTwoTone';
import ModalThemDuAn from '@/components/pages/du-an/modal/modal-them-du-an';
import ModalThemNguonLuc from '@/components/pages/du-an/modal/modal-them-nguon-luc';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import LoadingInline from '@/components/ui/loading/loading-inline';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import { Role, WorkState } from '@/constants/general';
import { QueryKeys } from '@/constants/query-key';
import useModal from '@/hooks/useModal';
import { ProjectServices } from '@/lib';
import { AxiosError, AxiosResponse } from 'axios';
import { AlertCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import ModalBaoCao from './modal-tool-bar/modal-bao-cao';
import ModalPhanQuyenDA from './modal-tool-bar/modal-phan-quyen-da';
import ModalTaoDauViec from './modal-tool-bar/modal-tao-dau-viec';
import ModalTaoDeXuat from './modal-tool-bar/modal-tao-de-xuat';
import { workerData } from 'worker_threads';

const LayoutQLDA = () => {
	const router = useRouter();
	const { id } = useParams();
	const { data } = useSession();
	const { user: session } = data ?? {};

	const {
		data: projectData,
		isFetching,
		refetch,
	} = useQuery<AxiosResponse<IProject>>({
		queryKey: QueryKeys.getDetailProject(id as string),
		queryFn: ({ queryKey }) => ProjectServices.getDetail(queryKey[1] as string),
		enabled: !!id,
	});

	const { data: isInProjectData, isFetching: isFetchingInfoPrj } = useQuery({
		queryKey: QueryKeys.isInProject(id as string),
		queryFn: ({ queryKey }) => ProjectServices.inProject(queryKey[1]),
		enabled: !!id,
	});

	const { mutate: doneProject, isLoading: updating } = useMutation({
		mutationFn: ProjectServices.doneProject,
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
		onSuccess: () => {
			toast.success('Đã hoàn thành dự án!');
			router.refresh();
		},
		onSettled: () => {
			handleCloseModal('modalDoneProject');
		},
	});

	const { mutate: cancelProj, isLoading: canceling } = useMutation({
		mutationFn: ProjectServices.cancelProject,
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
		onSuccess: () => {
			toast.success('Huỷ dự án thành công');
			refetch();
			router.refresh();
		},
		onSettled: () => {
			handleCloseModal('modalCancelProj');
		},
	});

	const { modal, handleCloseModal, handleOpenModal } = useModal({
		modalTDV: { open: false },
		modalPQDA: { open: false },
		modalTDX: { open: false },
		modalPJ: { open: false },
		modalRS: { open: false },
		modalDoneProject: { open: false },
		modalReport: { open: false },
		modalCancelProj: { open: false },
	});

	const isCanceled = projectData?.data?.canceledDate;
	const isDone = projectData?.data?.finishDate;
	const isProcessing = projectData?.data?.worksOfProject?.some((wOfP) =>
		[WorkState.Done, WorkState.Processing].includes(
			wOfP.work?.state?.name ?? ''
		)
	);
	const isHeadOrCreator = isInProjectData?.data?.isHeadOrCreator;
	const isSingleProject = projectData?.data?.isSingle;
	const isHeadOfDepartment =
		session?.info.positions?.[0]?.position?.code === Role.TRUONG_PHONG;

	return (
		<div className="p-2 rounded-md bg-primary2-light m-2 flex items-center gap-2 justify-end sticky top-2 z-10">
			{isCanceled ? (
				<p className="text-danger text-center w-full font-bold text-lg">
					Dự án đã bị huỷ
				</p>
			) : isDone ? (
				<p className="text-success text-center w-full font-bold text-lg">
					Dự án đã hoàn thành
				</p>
			) : (
				<>
					<>
						{isHeadOrCreator ? (
							<>
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleOpenModal('modalDoneProject')}
								>
									<IconChecks />
									<span className="ml-2">Hoàn thành dự án</span>
								</Button>

								<Button
									variant="outline"
									size="sm"
									onClick={() => handleOpenModal('modalRS')}
								>
									<IconDesign className="group-hover:text-destructive h-[20px] w-[20px]" />
									<span className="ml-2">Thêm nguồn lực</span>
								</Button>

								<Button
									variant="outline"
									size="sm"
									onClick={() => handleOpenModal('modalPJ')}
								>
									<IconEditTwoTone className="group-hover:text-warning " />
									<span className="ml-2">Chỉnh sửa dự án</span>
								</Button>

								<Button
									variant="outline"
									size="sm"
									onClick={() => handleOpenModal('modalTDV')}
								>
									<IconWork />
									<span className="ml-2">Tạo đầu việc</span>
								</Button>

								{isSingleProject && isHeadOfDepartment ? (
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleOpenModal('modalPQDA')}
									>
										<IconAuthenTool />
										<span className="ml-2">Phân quyền dự án</span>
									</Button>
								) : null}
							</>
						) : null}
					</>
					{isHeadOrCreator && !isDone && !isProcessing && (
						<Button
							onClick={() => handleOpenModal('modalCancelProj')}
							variant="destructive"
						>
							Huỷ dự án
						</Button>
					)}
					{!isHeadOrCreator ? (
						<>
							<Button
								variant="outline"
								onClick={() => handleOpenModal('modalTDX')}
							>
								<IconRecommend />
								<span className="ml-2">Tạo đề xuất</span>
							</Button>
							<Button
								variant="outline"
								onClick={() => handleOpenModal('modalReport')}
							>
								<IconRecommend />
								<span className="ml-2">Báo cáo</span>
							</Button>
						</>
					) : null}
				</>
			)}

			{isFetching || isFetchingInfoPrj ? <LoadingInline /> : null}

			<ModalThemDuAn
				open={modal.modalPJ.open}
				onClose={() => handleCloseModal('modalPJ')}
				title="Chỉnh sửa dự án"
				onRefresh={() => refetch()}
				data={projectData?.data ?? {}}
				isEdit
			/>

			<ModalConfirm
				title="Huỷ dự án"
				loading={canceling}
				onAccept={() => cancelProj(id as string)}
				onClose={() => handleCloseModal('modalCancelProj')}
				open={modal.modalCancelProj.open}
				msgCTA="Huỷ dự án"
				message="Bạn có chắc muốn huỷ dự án"
			/>

			<ModalConfirm
				title="Bạn có muốn hoàn thành dự án này"
				onAccept={() => doneProject(id as string)}
				onClose={() => handleCloseModal('modalDoneProject')}
				open={modal.modalDoneProject.open}
				msgCTA="Hoàn thành dự án"
				message={
					<Alert className="border-warning text-warning">
						<AlertCircle color="#fbbf24" className="w-4 h-4" />
						<AlertTitle>Warning</AlertTitle>
						<AlertDescription>
							Sau khi hoàn thành, bạn sẽ không được chỉnh sửa!
						</AlertDescription>
					</Alert>
				}
			/>

			<ModalThemNguonLuc
				title="Thêm nguồn lực"
				open={modal.modalRS.open}
				data={projectData?.data ?? {}}
				onClose={() => handleCloseModal('modalRS')}
				onRefresh={() => router.refresh()}
			/>
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
					idProject: id as string,
					finishDateETProject: projectData?.data.finishDateET,
				}}
				onClose={() => handleCloseModal('modalTDV')}
				onRefresh={() => router.refresh()}
			/>
			<ModalBaoCao
				title="Tạo báo cáo"
				open={modal.modalReport.open}
				onClose={() => handleCloseModal('modalReport')}
			/>
		</div>
	);
};

export default LayoutQLDA;
