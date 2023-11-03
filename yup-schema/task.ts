import dayjs from 'dayjs';
import * as yup from 'yup';

export const TaskSchema = (
	isEdit?: boolean,
	finishDateETWork?: OrNull<string>
) =>
	yup.object({
		name: yup.string().required('Tên công việc không được để trống'),
		startDate: yup
			.string()
			.required('Ngày bắt đầu công việc không được để trống')
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
			.required('Ngày hoàn thành dự kiến của công việc không được để trống')
			.test(
				'less-equal-than-work',
				`Ngày hoàn thành dự kiến công việc phải trước hoặc bằng đầu việc ${dayjs(
					finishDateETWork
				).format('DD/MM/YYYY')}`,
				function (value) {
					return dayjs(value).isBefore(finishDateETWork, 'day');
				}
			)
			.test(
				'more-than-start-date',
				'Ngày hoàn thành dự kiến phải lớn hơn ngày bắt đầu công việc',
				function (value) {
					return (
						dayjs(value).isAfter((this.options as any).parent.startDate) ||
						dayjs(value).isSame((this.options as any).parent.startDate, 'day')
					);
				}
			),
	});
