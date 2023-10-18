import * as yup from 'yup';

export const EmployeeSchema = yup.object({
  fullName: yup.string().required('Họ tên không được để trống'),
  phone: yup.string().required('Số điện thoại không được để trống'),
  gender: yup.string().required('Vui lòng chọn giới tính'),
});
