import React, { ReactNode } from 'react';
import Modal, { IModalProps } from '../modal';
import { Button, ButtonProps } from '../button';

interface IModalConfirm extends Omit<IModalProps, 'children' | 'title'> {
  onAccept: () => void;
  message?: ReactNode;
  title?: string;
  variant?: ButtonProps['variant'];
  msgCTA?: string;
}

const ModalConfirm = (props: IModalConfirm) => {
  const { variant, msgCTA, title, message, onAccept, ...rest } = props;
  return (
    <Modal {...rest} title={title ?? 'Bạn chắc chắn muốn xoá?'}>
      {message ? <p>{message}</p> : null}
      <div className="flex items-center gap-4 justify-end">
        <Button onClick={props.onClose} variant="outline">
          Đóng
        </Button>
        <Button onClick={onAccept} variant={variant ?? 'destructive'}>
          {msgCTA ?? 'Xoá'}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
