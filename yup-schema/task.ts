import dayjs from 'dayjs';
import * as yup from 'yup';

export const TaskSchema = yup.object({
	name: yup.string().required('Tên công việc không được để trống'),
	startDate: yup
		.string()
		.required('Ngày bắt đầu công việc không được để trống')
		.test('more-than-now', 'Ngày bắt đầu không thể trong quá khứ', (value) => {
			return (
				dayjs(value).isSame(dayjs().format('YYYY-MM-DD')) ||
				dayjs(value).isAfter(dayjs())
			);
		}),
	finishDateET: yup
		.string()
		.required('Ngày hoàn thành dự kiến của công việc không được để trống')
		.test(
			'more-than-start-date',
			'Ngày hoàn thành dự kiến phải lớn hơn ngày bắt đầu công việc',
			function (value) {
				return dayjs(value).isAfter((this.options as any).parent.startDate);
			}
		),
});
