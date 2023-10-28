import ThemNguonLuc from '@/components/special/them-nguon-luc';
import { Button } from '@/components/ui/button';
import Modal, { IModalProps } from '@/components/ui/modal';
import { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface IModalThemNguonLuc<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const ModalThemNguonLuc = <T,>(props: IModalThemNguonLuc<T>) => {
  const { data, ...rest } = props;
  const themNLRef = useRef<UseFormReturn>();

  const handleThemNL = () => {
    console.log(themNLRef.current?.getValues());
  };

  return (
    <Modal {...rest}>
      <ThemNguonLuc
        ref={themNLRef}
        scrollAreaProps={{ className: 'h-[65vh]' }}
      />
      <div className="items-center justify-end gap-4 flex mt-2">
        <Button variant="outline" onClick={rest.onClose}>
          Đóng
        </Button>
        <Button onClick={handleThemNL}>Xác nhận</Button>
      </div>
    </Modal>
  );
};

export default ModalThemNguonLuc;
