import * as yup from 'yup';

export const CertificationSchema = yup.object({
  name: yup.string().required('Tên không được để trống'),
});
