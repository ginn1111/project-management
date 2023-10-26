import * as yup from 'yup';

export const ResourceSchema = yup.object({
  name: yup.string().required('Tên nguồn lực không được để trống'),
  amount: yup
    .number()
    .typeError('Số lượng phải là số')
    .required('Số điện thoại không được để trống')
    .min(0, 'Số lượng không phải là số âm'),
  idResourceType: yup.string().required('Vui lòng chọn loại nguồn lực'),
});
