import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Modal, { IModalProps } from '@/components/ui/modal';
import Label from '@/components/ui/my-label';
import { Textarea } from '@/components/ui/textarea';
import { AccountServices } from '@/lib';
import { AxiosError } from 'axios';
import { identity, pick, pickBy } from 'lodash';
import { ReactNode, useEffect } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface IModalDoiMK<T> extends Omit<IModalProps<T>, 'children'> {}

const ModalDoiMK = (props: IModalDoiMK<Partial<IAccount>>) => {
  const { data, onRefresh, ...rest } = props;

  const { mutate, isLoading } = useMutation({
    mutationFn: AccountServices.update,
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công');
      onRefresh?.();
      rest.onClose();
    },
    onError: (error) => {
      toast.error((error as AxiosError).response?.data as ReactNode);
      rest.onClose();
    },
  });

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { isDirty },
  } = useForm();

  useEffect(() => {
    if (!rest.open) {
      reset();
    } else {
      reset(pick(data, 'note'));
    }
  }, [rest.open]);

  const handleSuccess = () => {
    const payload = {
      username: data?.username,
      ...getValues(),
    };

    mutate(pickBy(payload, identity));
  };

  const handleError: SubmitErrorHandler<Partial<IAccount>> = (errors) => {
    const keys = Object.keys(errors) as (keyof IAccount)[];
    toast.error(errors[keys[0]]?.message as ReactNode);
  };

  return (
    <Modal {...rest} loading={isLoading}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleSuccess, handleError)}
      >
        <div>
          <Label>Mật khẩu mới</Label>
          <Input
            type="password"
            {...register('password')}
            placeholder="mật khẩu mới"
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
          <Button disabled={!isDirty}>Xác nhận</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalDoiMK;
