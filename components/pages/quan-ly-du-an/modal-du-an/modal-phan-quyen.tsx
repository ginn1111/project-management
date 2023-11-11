import GroupSelectNhanVien from '@/components/special/group-select-nhan-vien';
import PhanQuyenDauViec from '@/components/special/phan-quyen-dau-viec';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';

interface IModalPhanQuyen<T> extends Omit<IModalProps, 'children'> {
	data: T;
}

const ModalPhanQuyen = <T,>(props: IModalPhanQuyen<T>) => {
	const { data, ...rest } = props;
	return (
		<Modal {...rest}>
			<GroupSelectNhanVien />
			<Label className="mb-0">Quyền</Label>
			{rest.open ? <PhanQuyenDauViec /> : null}

			<div className="flex items-center justify-end gap-4 mt-4">
				<Button onClick={rest.onClose} variant="outline">
					Đóng
				</Button>
				<Button>Xác nhận</Button>
			</div>
		</Modal>
	);
};

export default ModalPhanQuyen;
