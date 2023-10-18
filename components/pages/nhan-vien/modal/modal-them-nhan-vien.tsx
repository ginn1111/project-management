import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal, { IModalProps } from '@/components/ui/modal';
import ReactSelect from '@/components/ui/react-select';
import { generateOptions } from '@/constants/generate-options';
import { GenderIndex } from '@/constants/indexes';
import { genderOptions } from '@/constants/static-options';
import * as EmployeeServices from '@/lib/employee';
import { getDistricts, getWards } from '@/lib/utils/address';
import { identity, omit, omitBy, pickBy } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';
import { useToggle } from 'usehooks-ts';

interface IModalThemNhanVien<T> extends Omit<IModalProps<T>, 'children'> {
  isEdit?: boolean;
}

const ModalThemNhanVien = <T,>(props: IModalThemNhanVien<T>) => {
  const { data, isEdit = false, ...rest } = props;
  const queryClient = useQueryClient();
  const provinceData: IProvince[] = queryClient.getQueryData('provinces') ?? [];
  const [fetching, , setFetching] = useToggle();
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [wards, setWards] = useState<IWard[]>([]);

  const { mutate, isLoading } = useMutation({
    mutationFn: EmployeeServices.create,
    onSuccess: () => {
      toast.success('Thêm nhân viên thành công');
      rest.onClose();
    },
  });

  const { setValue, control, register, getValues, reset } = useForm<
    Partial<
      IEmployee & { idDistrict: OrNull<string>; idProvince: OrNull<string> }
    >
  >({
    defaultValues: {
      address: '',
      birthday: '',
      email: '',
      fullName: '',
      gender: 'NAM',
      note: '',
      phone: '',
      identifyNumber: '',
      idWard: '',
    },
  });

  useEffect(() => {
    if (!rest.open) {
      reset();
    } else {
    }
  }, [rest.open]);

  const handleGetDistricts = async (id: string) => {
    setFetching(true);
    try {
      const districts = await getDistricts(id);
      setDistricts(districts.data);
    } catch (error) {
    } finally {
      setFetching(false);
    }
  };

  const handleGetWards = async (id: string) => {
    setFetching(true);
    try {
      const wards = await getWards(id);
      setWards(wards.data);
    } catch (error) {
    } finally {
      setFetching(false);
    }
  };

  const handleCreateEmployee = () => {
    const payload = pickBy(
      omit(getValues(), ['idProvince', 'idDistrict']),
      identity
    );
    mutate(payload);
  };

  return (
    <Modal {...rest} loading={isLoading}>
      <div className="space-y-4">
        <div>
          <Label>Tên nhân viên</Label>
          <Input {...register('fullName')} placeholder="tên nhân viên" />
        </div>
        <div>
          <Label>Địa chỉ</Label>
          <Input {...register('address')} placeholder="địa chỉ" />
        </div>
        <ReactSelect
          name="idProvince"
          control={control}
          title="Tỉnh/ Thành phố"
          options={provinceData?.map((p) => ({
            value: p.id,
            label: p.name,
          }))}
          onChange={(p: any) => {
            setValue('idWard', null);
            setValue('idDistrict', null);
            handleGetDistricts(p.value);
          }}
        />
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <ReactSelect
              name="idDistrict"
              control={control}
              isLoading={fetching}
              title="Quận/ huyện"
              options={districts?.map((p) => ({
                value: p.id,
                label: p.name,
              }))}
              onChange={(p: any) => {
                setValue('idWard', null);
                handleGetWards(p.value);
              }}
            />
          </div>
          <div className="flex-1">
            <ReactSelect
              name="idWard"
              isLoading={fetching}
              control={control}
              title="Xã/phường/ thị trấn"
              options={wards?.map((p) => ({
                value: p.id,
                label: p.name,
              }))}
            />
          </div>
        </div>

        <ReactSelect
          control={control}
          name="gender"
          title="Giới tính"
          options={generateOptions(GenderIndex)}
          placeholder="giới tính"
        />
        <div>
          <Label>Số điện thoại</Label>
          <Input
            {...register('phone')}
            type="number"
            placeholder="số điện thoại"
          />
        </div>
        <div>
          <Label>Ngày sinh</Label>
          <Input
            {...register('birthday')}
            type="date"
            placeholder="ngày sinh"
          />
        </div>
        <div>
          <Label>CMND/ CCCD</Label>
          <Input {...register('identifyNumber')} placeholder="cmnd/ cccc" />
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
        <Button onClick={handleCreateEmployee}>Xác nhận</Button>
      </div>
    </Modal>
  );
};

export default ModalThemNhanVien;
