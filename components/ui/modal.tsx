import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import LoadingInline from './loading/loading-inline';

export interface IModalProps<T = any> {
  title: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  data?: T;
  loading?: boolean;
}

const Modal = ({
  onClose,
  loading = false,
  open,
  title,
  children,
}: IModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[98vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="relative">
          {loading ? <LoadingInline /> : null}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
