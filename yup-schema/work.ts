import dayjs from 'dayjs';
import * as yup from 'yup';

export const WorkSchema = (
	isEdit?: boolean,
	finishDateETProject?: OrNull<string>
) =>
	yup.object({
		name: yup.string().required('Tên đầu việc không được để trống'),
		startDate: yup
			.string()
			.required('Ngày bắt đầu đầu việc không được để trống')
			.test(
				'more-than-now',
				'Ngày bắt đầu không thể trong quá khứ',
				(value) => {
					if (isEdit) return true;
					return (
						dayjs(value).isSame(dayjs(), 'day') || dayjs(value).isAfter(dayjs())
					);
				}
			),
		finishDateET: yup
			.string()
			.required('Ngày hoàn thành dự kiến của đầu việc không được để trống')
			.test(
				'less-equal-than-project',
				`Ngày hoàn thành dự kiến đầu việc phải trước dự án ${dayjs(
					finishDateETProject
				).format('DD/MM/YYYY')}`,
				function (value) {
					if (isEdit) return true;
					return dayjs(value).isBefore(finishDateETProject, 'day');
				}
			)
			.test(
				'more-than-start-date',
				'Ngày hoàn thành dự kiến phải lớn hơn ngày bắt đầu đầu việc',
				function (value) {
					return (
						dayjs(value).isAfter((this.options as any).parent.startDate) ||
						dayjs(value).isSame((this.options as any).parent.startDate, 'day')
					);
				}
			),
	});
