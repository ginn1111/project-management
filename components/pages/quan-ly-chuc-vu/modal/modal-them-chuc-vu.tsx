import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Modal, { IModalProps } from '@/components/ui/modal';
import Label from '@/components/ui/my-label';
import { Textarea } from '@/components/ui/textarea';
import { PositionServices } from '@/lib';
import { PositionSchema } from '@/yup-schema/position';
import { yupResolver } from '@hookform/resolvers/yup';
import { identity, omit, pickBy } from 'lodash';
import { ReactNode, useEffect } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface IModalThemChucVu<T> extends Omit<IModalProps<T>, 'children'> {
  isEdit?: boolean;
}

const ModalThemChucVu = (props: IModalThemChucVu<Partial<IPosition>>) => {
  const { data, onRefresh, isEdit = false, ...rest } = props;

  const { mutate, isLoading } = useMutation({
    mutationFn: !isEdit ? PositionServices.create : PositionServices.update,
    onSuccess: () => {
      toast.success(`${!isEdit ? 'Thêm' : 'Cập nhật'} chức vụ thành công`);
      onRefresh?.();
      rest.onClose();
    },
  });

  const { handleSubmit, register, getValues, reset } = useForm({
    resolver: yupResolver(PositionSchema) as any,
  });

  useEffect(() => {
    if (!rest.open) {
      reset();
    } else {
      if (isEdit) {
        const resetValue = omit(data, ['id']);
        reset(resetValue);
      }
    }
  }, [rest.open]);

  const handleSuccess = () => {
    const payload = {
      ...pickBy(getValues(), identity),
      id: data?.id,
    };
    mutate(payload);
  };

  const handleError: SubmitErrorHandler<Partial<IPosition>> = (errors) => {
    const keys = Object.keys(errors) as (keyof IPosition)[];
    toast.error(errors[keys[0]]?.message as ReactNode);
  };

  return (
    <Modal {...rest} loading={isLoading}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleSuccess, handleError)}
      >
        <div>
          <Label required>Tên chức vụ</Label>
          <Input {...register('name')} placeholder="tên chức vụ" />
        </div>

        <div>
          <Label>Ghi chú</Label>
          <Textarea {...register('note')} placeholder="ghi chú" />
        </div>

        <div className="flex items-center justify-end gap-4 mt-4">
          <Button type="button" onClick={rest.onClose} variant="outline">
            Đóng
          </Button>
          <Button>Xác nhận</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalThemChucVu;
