import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import ReactSelect from '@/components/ui/react-select';
import { genderOptions } from '@/constants/static-options';
import React from 'react';

interface IModalThemNhanVien<T> extends Omit<IModalProps<T>, 'children'> {
  isEdit?: boolean;
}

const ModalThemNhanVien = <T,>(props: IModalThemNhanVien<T>) => {
  const { data, isEdit = false, ...rest } = props;
  return (
    <Modal {...rest}>
      <div className="space-y-4">
        <div>
          <Label>Tên nhân viên</Label>
          <Input placeholder="tên nhân viên" />
        </div>
        <ReactSelect
          title="Giới tính"
          options={genderOptions}
          placeholder="giới tính"
        />
        <div>
          <Label>Số điện thoại</Label>
          <Input type="number" placeholder="số điện thoại" />
        </div>
        <div>
          <Label>CMND/ CCCD</Label>
          <Input placeholder="cmnd/ cccc" />
        </div>
        <div>
          <Label>Địa chỉ</Label>
          <Input placeholder="địa chỉ" />
        </div>
        <div>
          <Label>Tỉnh/ Thành phố</Label>
          <Input placeholder="tỉnh / thành phố" />
        </div>
        <div>
          <Label>Quận/ huyện</Label>
          <Input placeholder="quận/ huyện" />
        </div>
        {isEdit ? null : (
          <ReactSelect
            title="Phòng ban"
            placeholder="phòng ban"
            options={[
              {
                value: 'PB1',
                label: 'PB1',
              },
            ]}
          />
        )}
      </div>
      <div className="flex items-center justify-end gap-4 mt-4">
        <Button onClick={rest.onClose} variant="outline">
          Đóng
        </Button>
        <Button>Xác nhận</Button>
      </div>
    </Modal>
  );
};

export default ModalThemNhanVien;
