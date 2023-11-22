import * as yup from 'yup';

export const EmployeeSchema = yup.object({
	fullName: yup.string().required('Họ tên không được để trống'),
	phone: yup
		.string()
		.required('Số điện thoại không được để trống')
		.matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại không hợp lệ!'),
	gender: yup.string().required('Vui lòng chọn giới tính'),
	email: yup.string().email('Email không hợp lệ!'),
	identifyNumber: yup
		.string()
		.notRequired()
		.matches(/(\d{9,12})/gm, {
			excludeEmptyString: true,
			message: 'CMND/CCCCD không hợp lệ!',
		}),
});
