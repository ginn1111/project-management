import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';

export interface IModalProps<T = any> {
  title: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  data?: T;
}

const Modal = ({ onClose, open, title, children }: IModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[98vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
