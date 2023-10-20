import * as yup from 'yup';

export const DepartmentSchema = yup.object<any>({
  name: yup.string().required('Tên không được để trống'),
});
