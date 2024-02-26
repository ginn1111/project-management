import PhanQuyenDauViec from '@/components/special/phan-quyen-dau-viec';
import { Button } from '@/components/ui/button';
import Modal, { IModalProps } from '@/components/ui/modal';
import React from 'react';

const ModalChinhSuaQuyenDuAn = <T,>(
	props: Omit<IModalProps<T>, 'children'>
) => {
	const { data, ...rest } = props;
	return (
		<Modal {...rest}>
			<PhanQuyenDauViec className="h-[70vh]" />
			<div className="flex items-center justify-end gap-4 mt-4">
				<Button onClick={rest?.onClose} variant="outline">
					Đóng
				</Button>
				<Button>Xác nhận</Button>
			</div>
		</Modal>
	);
};

export default ModalChinhSuaQuyenDuAn;
