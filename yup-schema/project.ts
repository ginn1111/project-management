import dayjs from 'dayjs';
import * as yup from 'yup';

export const ProjectSchema = (isEdit?: boolean, isManage?: boolean) =>
	yup.object({
		name: yup.string().required('Tên dự án không được để trống'),
		...(isManage
			? { idEmpHead: yup.string().required('Vui lòng chọn người phụ trách') }
			: null),
		startDate: yup
			.string()
			.required('Ngày bắt đầu dự án không được để trống')
			.test(
				'more-than-now',
				'Ngày bắt đầu không thể trong quá khứ',
				(value) => {
					if (isEdit) return true;
					return (
						dayjs(value).isSame(dayjs().format('YYYY-MM-DD')) ||
						dayjs(value).isAfter(dayjs())
					);
				}
			),
		finishDateET: yup
			.string()
			.required('Ngày hoàn thành dự kiến của dự án không được để trống')
			.test(
				'more-than-start-date',
				'Ngày hoàn thành dự kiến phải lớn hơn ngày bắt đầu dự án',
				function (value) {
					if (isEdit) return true;
					return dayjs(value).isAfter((this.options as any).parent.startDate);
				}
			),
	});
