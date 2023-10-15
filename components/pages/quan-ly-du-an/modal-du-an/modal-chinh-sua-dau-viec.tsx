import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { datetimeLocal } from '@/utils/helpers';
import { pick } from 'lodash';
import { useEffect } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';

interface IModalChinhSuaDauViec<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const ModalChinhSuaDauViec = <T extends FieldValues>(
  props: IModalChinhSuaDauViec<T>
) => {
  const { data, ...rest } = props;
  const { watch, control, reset, register, getValues } = useForm({
    shouldUnregister: true,
  });

  useEffect(() => {
    if (rest.open) {
      reset({ ...pick(data, ['start', 'end', 'title', 'description']) });
    }
  }, [rest.open]);

  return (
    <Modal {...rest}>
      <div className="space-y-4">
        <div>
          <Label>Tên đầu việc</Label>
          <Input {...register('title')} placeholder="tên đầu việc" />
        </div>
        <div>
          <Label>Ngày bắt đầu</Label>
          <Controller
            name="start"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  type="datetime-local"
                  {...field}
                  value={(() => {
                    return datetimeLocal(field.value);
                  })()}
                />
              );
            }}
          />
        </div>
        <div>
          <Label>Ngày hoàn thành dự kiến</Label>
          <Controller
            name="end"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  type="datetime-local"
                  {...field}
                  value={(() => {
                    return datetimeLocal(field.value);
                  })()}
                />
              );
            }}
          />
        </div>
        <div>
          <Label>Mô tả</Label>
          <Textarea {...register('description')} placeholder="mô tả" rows={8} />
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end gap-4">
        <Button variant="outline" onClick={rest.onClose}>
          Đóng
        </Button>
        <Button>Xác nhận</Button>
      </div>
    </Modal>
  );
};

export default ModalChinhSuaDauViec;
