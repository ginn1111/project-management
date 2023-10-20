import IconCalendar from '@/components/Icon/IconCalendar';
import IconCoffee from '@/components/Icon/IconCoffee';
import IconMail from '@/components/Icon/IconMail';
import IconMapPin from '@/components/Icon/IconMapPin';
import IconPhone from '@/components/Icon/IconPhone';
import LichSuPB from './lich-su-pb';
import dayjs from 'dayjs';

interface IThongTin {
  employee: Partial<IEmployee>;
}

const ThongTin = ({ employee }: IThongTin) => {
  const ward = employee.ward;
  const district = ward?.district;
  const province = district?.province;

  return (
    <div className="mb-5 grid gap-2 grid-cols-3">
      <div className="panel">
        <ul className="m-auto mt-5 flex flex-col space-y-4 font-semibold text-white-dark h-full">
          <p className="text-xl font-semibold text-primary">
            {employee.fullName}
          </p>
          <li className="flex items-center gap-2">
            <IconCoffee className="shrink-0" /> Web Developer
          </li>
          {employee.birthday ? (
            <li className="flex items-center gap-2">
              <IconCalendar className="shrink-0" />
              {dayjs(employee.birthday).format('MMM D, YYYY')}
            </li>
          ) : null}
          {employee?.address ||
          ward?.name ||
          district?.name ||
          province?.name ? (
            <li className="flex items-center gap-2">
              <IconMapPin className="shrink-0" />
              {employee?.address} {ward?.name} {district?.name} {province?.name}
            </li>
          ) : null}
          {employee?.email ? (
            <li>
              <a
                href={`mailto:${employee?.email}`}
                className="flex items-center gap-2"
              >
                <IconMail className="w-5 h-5 shrink-0" />
                <span className="truncate text-primary">{employee?.email}</span>
              </a>
            </li>
          ) : null}
          {employee?.phone ? (
            <li className="flex items-center gap-2">
              <IconPhone />
              <span className="whitespace-nowrap" dir="ltr">
                {employee?.phone}
              </span>
            </li>
          ) : null}
        </ul>
      </div>
      <div className="panel col-span-2">
        <LichSuPB departments={employee.departments} />
      </div>
    </div>
  );
};

export default ThongTin;
