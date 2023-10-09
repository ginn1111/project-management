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
      <div className="min-h-[200px] space-y-4">
        <div>
          <Label>Phòng ban</Label>
          <ReactSelect
            theme={RSTheme}
            className="!outline-none !border-none"
            options={[
              {
                value: 'fuck1',
                label: 'Fuck label1',
              },
              {
                value: 'fuck2',
                label: 'Fuck label2',
              },
              {
                value: 'fuck3',
                label: 'Fuck label3',
              },
              {
                value: 'fuck4',
                label: 'Fuck label4',
              },
            ]}
          />
        </div>
        <div>
          <Label>Nhân viên</Label>
          <ReactSelect
            theme={RSTheme}
            className="!outline-none !border-none"
            isMulti
            options={[
              {
                value: 'fuck',
                label: 'Fuck label',
              },
              {
                value: 'fuck',
                label: 'Fuck label',
              },
              {
                value: 'fuck',
                label: 'Fuck label',
              },
              {
                value: 'fuck',
                label: 'Fuck label',
              },
            ]}
          />
        </div>
      </div>
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
