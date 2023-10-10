import IconXCircle from '@/components/Icon/IconXCircle';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { ScrollArea } from '@/components/ui/scroll-area';
import dayjs from 'dayjs';

interface IModalDuAn<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const ModalChiTietDauViec = <T,>(props: IModalDuAn<T>) => {
  const { ...rest } = props;
  return (
    <Modal {...rest}>
      <div>
        <Label>Nhân viên dự án</Label>
        <ScrollArea className="h-[200px] w-full rounded-md border p-2">
          <div className="flex items-center justify-between hover:bg-primary2-light p-2 rounded-md">
            <span>Nguyen Van A</span>
            <Button variant="secondary" size="icon">
              <IconXCircle className="text-danger" />
            </Button>
          </div>
        </ScrollArea>
      </div>
      <div className="overflow-y-auto max-h-[40vh]">
        <Label>Mô tả</Label>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem nihil
          enim aut nobis fugit impedit a iste sit asperiores ipsa, porro facere
          consectetur debitis distinctio. Ab itaque deserunt sed odio?
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <p className="bg-primary2-light text-primary2 max-w-max px-2 py-1 rounded-md outline-offset-2 outline outline-solid outline-primary2">
          Deadline: {dayjs().format('DD/MM/YYYY')}
        </p>
        <Button variant="outline" onClick={rest.onClose}>
          Đóng
        </Button>
      </div>
    </Modal>
  );
};

export default ModalChiTietDauViec;
