import * as yup from 'yup';

export const QualificationSchema = yup.object<any>({
	name: yup.string().required('Tên không được để trống'),
});
export const RoleSchema = yup.object({
	roleName: yup.string().required('Tên chuyên môn không được để trống'),
});
