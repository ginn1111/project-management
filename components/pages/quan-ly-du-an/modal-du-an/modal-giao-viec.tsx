import GroupSelectNhanVien from '@/components/special/group-select-nhan-vien';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { RSTheme } from '@/constants/theme';
import ReactSelect from 'react-select';

interface IModalGiaoViec<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const ModalGiaoViec = <T,>(props: IModalGiaoViec<T>) => {
  const { data, ...rest } = props;
  return (
    <Modal {...rest}>
      <GroupSelectNhanVien />
      <div className="items-center justify-end gap-4 flex mt-2">
        <Button variant="outline" onClick={rest.onClose}>
          Đóng
        </Button>
        <Button>Xác nhận</Button>
      </div>
    </Modal>
  );
};

export default ModalGiaoViec;
