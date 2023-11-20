'use client';

import { Label } from '@/components/ui/label';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import { Textarea } from '@/components/ui/textarea';
import useModal from '@/hooks/useModal';
import { ProjectServices } from '@/lib';
import { AxiosError } from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useRef } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import DuAnCard from './du-an-card';

interface IListDuAn {
	data: { projects: IProject[]; totalItems: number };
}

const ListDuAn = ({ data }: IListDuAn) => {
	const router = useRouter();
	const { data: session } = useSession();
	const { user } = session ?? {};

	const { modal, handleOpenModal, handleCloseModal } = useModal({
		modalPP: {
			open: false,
			payload: { idEmployee: '', idProject: '', content: '' },
		},
	});

	const { mutate: proposeProject, isLoading } = useMutation({
		mutationFn: ProjectServices.proposeProject,
		onSuccess: () => {
			toast.success('Đề xuất tham gia dự án thành công');
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as ReactNode);
		},
		onSettled: () => {
			handleCloseModal('modalPP');
		},
	});

	const contentRef = useRef<HTMLTextAreaElement | null>(null);

	const handlePropose = () => {
		if (!user?.info?.id) {
			signOut();
			return;
		}
		if (!contentRef.current?.value) {
			toast.error('Vui lòng nhập lời nhắn để đề xuất');
			return;
		}
		const payload = {
			...modal.modalPP.payload,
			idEmployee: user?.info.id,
			content: contentRef.current.value,
		};
		proposeProject(payload);
	};

	return (
		<div className="grid grid-cols-fill-300 gap-3 m-2 relative">
			{data?.projects?.length ? (
				data.projects.map((project, idx) => (
					<DuAnCard
						key={idx}
						{...project}
						onPropose={() =>
							handleOpenModal('modalPP', {
								payload: {
									idProject: project.id,
								},
							})
						}
					/>
				))
			) : (
				<p className="col-span-3 text-center text-[16px] text-danger font-bold">
					Không có dự án nào
				</p>
			)}

			<ModalConfirm
				loading={isLoading}
				open={modal.modalPP.open}
				title="Đề xuất tham gia dự án"
				message={
					<>
						<p className="text-md mb-2">
							Bạn có chắc chắn muốn đề xuất tham gia vào dự án này?
						</p>
						<Label>Lời nhắn</Label>
						<Textarea ref={contentRef} placeholder="lời nhắn" />
					</>
				}
				onAccept={handlePropose}
				onClose={() => handleCloseModal('modalPP')}
				variant="default"
				msgCTA="Xác nhận"
			/>
		</div>
	);
};

export default ListDuAn;
