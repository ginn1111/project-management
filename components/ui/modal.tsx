import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './dialog';

export interface IModalProps {
  title: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal = ({ onClose, open, title, children }: IModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader onClick={onClose}>
          <DialogTitle onClick={onClose}>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
