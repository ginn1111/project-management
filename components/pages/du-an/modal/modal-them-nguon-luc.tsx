import ThemNguonLuc from '@/components/special/them-nguon-luc';
import { Button } from '@/components/ui/button';
import Modal, { IModalProps } from '@/components/ui/modal';

interface IModalThemNguonLuc<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const ModalThemNguonLuc = <T,>(props: IModalThemNguonLuc<T>) => {
  const { data, ...rest } = props;
  return (
    <Modal {...rest}>
      <ThemNguonLuc scrollAreaProps={{ className: 'h-[65vh]' }} />
      <div className="items-center justify-end gap-4 flex mt-2">
        <Button variant="outline" onClick={rest.onClose}>
          Đóng
        </Button>
        <Button>Xác nhận</Button>
      </div>
    </Modal>
  );
};

export default ModalThemNguonLuc;
