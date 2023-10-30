import ThemNguonLuc from '@/components/special/them-nguon-luc';
import { Button } from '@/components/ui/button';
import Label from '@/components/ui/my-label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { ProposeResourceServices } from '@/lib';
import { formatResourceForm } from '@/utils/format-resource-form';
import { AxiosError, AxiosResponse } from 'axios';
import { ReactNode, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface IModalTaoDeXuat<T> extends Omit<IModalProps, 'children'> {
  data: T;
}

const ModalTaoDeXuat = <T,>(props: IModalTaoDeXuat<T>) => {
  const { data, ...rest } = props;
  const refNL = useRef<UseFormReturn>();
  const refDescription = useRef<HTMLTextAreaElement | null>(null);
  const { mutate: createPropose, isLoading } = useMutation({
    mutationFn: ProposeResourceServices.add,
    onSettled: () => {
      rest.onClose();
    },
    onError: (error: AxiosError<ReactNode>) => {
      toast.error(error.response?.data);
    },
    onSuccess: (response: AxiosResponse) => {
      toast.success(response.data);
      rest.onRefresh?.();
    },
  });

  const handleAddPropose = () => {
    const payload = {
      // TODO
      // hardcode for test
      idEmpProject: 'EMPR_01HDKX8QAPZZJC56H5EH72QZW4',
      resource: formatResourceForm(
        refNL.current?.getValues() as Record<
          string,
          { active?: boolean; number?: number }
        >
      ),
      description: refDescription.current?.value,
    };

    createPropose(payload);
  };

  return (
    <Modal {...rest} loading={isLoading}>
      <div className="space-y-4">
        <ThemNguonLuc
          ref={refNL}
          scrollAreaProps={{
            className: 'h-[40vh]',
          }}
        />
        <div>
          <Label>Mô tả</Label>
          <Textarea ref={refDescription} rows={5} placeholder="mô tả" />
        </div>
      </div>

      <div className="items-center justify-end gap-4 flex mt-2">
        <Button variant="outline" onClick={rest.onClose}>
          Đóng
        </Button>
        <Button onClick={handleAddPropose}>Xác nhận</Button>
      </div>
    </Modal>
  );
};

export default ModalTaoDeXuat;
