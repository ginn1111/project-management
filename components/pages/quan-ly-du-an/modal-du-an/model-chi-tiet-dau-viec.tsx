import IconXCircle from '@/components/Icon/IconXCircle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import { ScrollArea } from '@/components/ui/scroll-area';
import dayjs from 'dayjs';
import { useToggle } from 'usehooks-ts';

interface IModalDuAn<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const ModalChiTietDauViec = <T,>(props: IModalDuAn<T>) => {
  const [show, , setShow] = useToggle();
  const { ...rest } = props;
  return (
    <>
      <Modal {...rest}>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Label>Ngày bắt đầu</Label>
            <Input type="datetime-local" disabled />
          </div>
          <div className="flex-1">
            <Label>Ngày hoàn thành</Label>
            <Input type="datetime-local" disabled />
          </div>
        </div>
        <div>
          <Label>Nhân viên thuộc đầu việc</Label>
          <ScrollArea className="h-[200px] w-full rounded-md border p-2">
            <div className="flex items-center justify-between hover:bg-muted p-2 rounded-md cursor-pointer">
              <span className="text-sm">Nguyen Van A</span>
              <Button
                className="hover:bg-danger"
                variant="secondary"
                size="icon"
                onClick={() => setShow(true)}
              >
                <IconXCircle className="text-danger hover:text-white" />
              </Button>
            </div>
          </ScrollArea>
        </div>
        <div className="overflow-y-auto max-h-[40vh]">
          <Label>Mô tả</Label>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem
            nihil enim aut nobis fugit impedit a iste sit asperiores ipsa, porro
            facere consectetur debitis distinctio. Ab itaque deserunt sed odio?
          </p>
        </div>

        <div className="mt-2 flex items-center justify-end">
          <Button variant="outline" onClick={rest.onClose}>
            Đóng
          </Button>
        </div>
      </Modal>
      <ModalConfirm
        onClose={() => setShow(false)}
        onAccept={() => alert('delete')}
        open={show}
      />
    </>
  );
};

export default ModalChiTietDauViec;
