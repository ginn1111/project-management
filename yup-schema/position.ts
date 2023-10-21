import * as yup from 'yup';

export const PositionSchema = yup.object({
  name: yup.string().required('Tên chức vụ không được để trống'),
});
