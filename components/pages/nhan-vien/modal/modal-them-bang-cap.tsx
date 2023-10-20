import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { QualificationServices } from '@/lib';
import { DepartmentSchema } from '@/yup-schema/qualification';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { identity, pick, pickBy } from 'lodash';
import { ReactNode, useEffect } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const ModalThemBangCap = (
  props: Omit<
    IModalProps<Partial<QualificationEmployee & Qualification>>,
    'children'
  > & {
    isEdit?: boolean;
  }
) => {
  const { onRefresh, isEdit, data, ...rest } = props;
  const { mutate, isLoading } = useMutation({
    mutationFn: !isEdit
      ? QualificationServices.create
      : QualificationServices.update,
    onSuccess: () => {
      toast.success('Thêm bằng cấp thành công');
      rest.onClose();
      onRefresh?.();
    },
  });
  const { reset, getValues, register, handleSubmit } = useForm({
    resolver: yupResolver(DepartmentSchema) as any,
  });

  useEffect(() => {
    if (rest.open && isEdit) {
      const { date, note, qualification } = pick(data, [
        'date',
        'note',
        'qualification',
      ]);
      reset({
        name: qualification?.name,
        date: dayjs(date).isValid()
          ? dayjs(date).format('YYYY-MM-DD')
          : undefined,
        note,
      });
    } else {
      reset({ name: '', date: null, note: '' });
    }
  }, [rest.open]);

  const handleCreateQualification = () => {
    const payload = {
      ...pickBy(getValues(), identity),
      ...(!isEdit
        ? {
            idEmployee: data?.idEmployee,
          }
        : {
            id: data?.idQualification,
          }),
    };

    mutate(payload);
  };

  const handleError: SubmitErrorHandler<any> = (errors) => {
    const keys = Object.keys(errors) as (keyof IEmployee)[];
    toast.error(errors[keys[0]]?.message as ReactNode);
  };

  return (
    <Modal
      {...rest}
      title={`${isEdit ? 'Chỉnh sửa' : 'Thêm'} ${rest.title}`}
      loading={isLoading}
    >
      <form
        onSubmit={handleSubmit(handleCreateQualification, handleError)}
        className="space-y-4"
      >
        <div>
          <Label>Tên bằng cấp</Label>
          <Input {...register('name')} placeholder="tên bằng cấp" />
        </div>
        <div>
          <Label>Ngày cấp</Label>
          <Input {...register('date')} type="date" className="ngày cấp" />
        </div>
        {/* <div>
          <Label>Hình ảnh bằng cấp</Label>
          <Input type="file" className="hình ảnh bằng cấp" />
        </div> */}
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

export default ModalThemBangCap;
