import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Modal, { IModalProps } from '@/components/ui/modal';
import Label from '@/components/ui/my-label';
import { Textarea } from '@/components/ui/textarea';
import { AccountServices } from '@/lib';
import { AccountSchema } from '@/yup-schema/account';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { ReactNode, useEffect } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface IModalThemTaiKhoan<T> extends Omit<IModalProps<T>, 'children'> {}

const ModalThemTaiKhoan = (props: IModalThemTaiKhoan<Partial<IDepartment>>) => {
  const { data, onRefresh, ...rest } = props;

  const { mutate, isLoading } = useMutation({
    mutationFn: AccountServices.create,
    onSuccess: () => {
      toast.success('Thêm tài khoản thành công');
      onRefresh?.();
      rest.onClose();
    },
    onError: (error) => {
      toast.error((error as AxiosError).response?.data as ReactNode);
      rest.onClose();
    },
  });

  const { handleSubmit, register, getValues, reset } = useForm({
    resolver: yupResolver(AccountSchema) as any,
  });

  useEffect(() => {
    if (!rest.open) {
      reset();
    }
  }, [rest.open]);

  const handleSuccess = () => {
    mutate(getValues());
  };

  const handleError: SubmitErrorHandler<Partial<IDepartment>> = (errors) => {
    const keys = Object.keys(errors) as (keyof IDepartment)[];
    toast.error(errors[keys[0]]?.message as ReactNode);
  };

  return (
    <Modal {...rest} loading={isLoading}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleSuccess, handleError)}
      >
        <div>
          <Label required>Tài khoản</Label>
          <Input {...register('username')} placeholder="tài khoản" />
        </div>
        <div>
          <Label required>Mật khẩu</Label>
          <Input
            type="password"
            {...register('password')}
            placeholder="mật khẩu"
          />
        </div>
        <div>
          <Label>Ghi chú</Label>
          <Textarea {...register('note')} placeholder="ghi chú" rows={5} />
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

export default ModalThemTaiKhoan;
