import dayjs from 'dayjs';
import * as yup from 'yup';

export const ProjectSchema = yup.object({
  name: yup.string().required('Tên dự án không được để trống'),
  startDate: yup
    .string()
    .required('Ngày bắt đầu dự án không được để trống')
    .test('more-than-now', 'Ngày bắt đầu không thể trong quá khứ', (value) => {
      return (
        dayjs(value).isSame(dayjs().format('YYYY-MM-DD')) ||
        dayjs(value).isAfter(dayjs())
      );
    }),
  finishDateET: yup
    .string()
    .required('Ngày hoàn thành dự kiến của dự án không được để trống')
    .test(
      'more-than-start-date',
      'Ngày hoàn thành dự kiến phải lớn hơn ngày bắt đầu dự án',
      function (value) {
        return dayjs(value).isAfter((this.options as any).parent.startDate);
      }
    ),
});
