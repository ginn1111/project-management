import IconCalendar from '@/components/Icon/IconCalendar';
import IconCoffee from '@/components/Icon/IconCoffee';
import IconMail from '@/components/Icon/IconMail';
import IconMapPin from '@/components/Icon/IconMapPin';
import IconPhone from '@/components/Icon/IconPhone';
import LichSuPB from './lich-su-pb';

const ThongTin = () => {
  return (
    <div className="mb-5 grid gap-2 grid-cols-3">
      <div className="panel">
        <div className="mb-5">
          <div className="flex flex-col items-center justify-center">
            <img
              src="/assets/images/profile-34.jpeg"
              alt="img"
              className="mb-5 h-24 w-24 rounded-full  object-cover"
            />
            <p className="text-xl font-semibold text-primary">Jimmy Turner</p>
          </div>
          <ul className="m-auto mt-5 flex max-w-[160px] flex-col space-y-4 font-semibold text-white-dark">
            <li className="flex items-center gap-2">
              <IconCoffee className="shrink-0" /> Web Developer
            </li>
            <li className="flex items-center gap-2">
              <IconCalendar className="shrink-0" />
              Jan 20, 1989
            </li>
            <li className="flex items-center gap-2">
              <IconMapPin className="shrink-0" />
              New York, USA
            </li>
            <li>
              <button className="flex items-center gap-2">
                <IconMail className="w-5 h-5 shrink-0" />
                <span className="truncate text-primary">jimmy@gmail.com</span>
              </button>
            </li>
            <li className="flex items-center gap-2">
              <IconPhone />
              <span className="whitespace-nowrap" dir="ltr">
                +1 (530) 555-12121
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="panel col-span-2">
        <LichSuPB />
      </div>
    </div>
  );
};

export default ThongTin;
