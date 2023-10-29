import IconCalendar from '@/components/Icon/IconCalendar';
import IconDesign from '@/components/Icon/IconDesign';
import IconEditTwoTone from '@/components/Icon/IconEditTwoTone';
import IconEyeTwoTone from '@/components/Icon/IconEyeTwoTone';
import IconSendTwoTone from '@/components/Icon/IconSendTwoTone';
import { Label } from '@/components/ui/label';
import useModal from '@/hooks/useModal';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Link from 'next/link';
dayjs.extend(duration);

interface IDuAnCard extends IProject {
  onUpdate: () => void;
  onAddResource: () => void;
  onPropose: () => void;
}

const DuAnCard = ({
  name,
  startDate,
  finishDateET,
  departments,
  onUpdate,
  onAddResource,
  onPropose,
}: IDuAnCard) => {
  return (
    <div className="rounded-sm p-2 bg-gradient-from-tl bg-gradient-to-br from-accent to-primary2-light col-span-1 min-h-[200px] transition-all border-2 hover:border-ring border-transparent hover:from-primary2-light hover:to-accent flex flex-col gap-2">
      <div className="border-b border-primary pb-1 flex items-start justify-between gap-4">
        <h2 className="text-xl font-medium ">{name}</h2>
        <p className="border-primary bg-accent rounded-md text-primary border p-1 flex-shrink-0 flex items-center gap-2">
          <IconCalendar className="text-sm" />
          <span className="bg-primary rounded-sm text-accent px-1 text-[12px]">
            {dayjs(finishDateET).isValid() && dayjs(startDate).isValid()
              ? dayjs
                  .duration(
                    dayjs(new Date(finishDateET)).diff(
                      new Date(startDate),
                      'months'
                    ),
                    'months'
                  )
                  .months() + ' tháng'
              : 'N/A'}{' '}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-4 justify-between">
        <Label className="text-md mb-0">Ngày bắt đầu</Label>
        <p>
          {dayjs(startDate).isValid() ? (
            dayjs(startDate).format('DD/MM/YYYY')
          ) : (
            <span className="text-danger font-medium">N/A</span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-4 justify-between">
        <Label className="text-md mb-0">Ngày kết thúc</Label>
        <p>
          {dayjs(finishDateET).isValid() ? (
            dayjs(finishDateET).format('DD/MM/YYYY')
          ) : (
            <span className="text-danger font-medium">N/A</span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-4 justify-between">
        <Label className="text-md mb-0">Khách hàng</Label>
        <p>Tên khách hàng</p>
      </div>
      {departments?.length ? (
        <div>
          <Label className="text-md">Phòng ban</Label>
          <ul className="grid grid-cols-fill-80 gap-2">
            {departments?.map(({ department }, index) => (
              <li
                key={index}
                className={cn(
                  'px-3 py-1 rounded-md bg-primary text-muted flex-1 whitespace-nowrap text-center'
                )}
              >
                {department?.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-danger font-medium">Chưa có phòng ban</p>
      )}
      <div className="flex items-center gap-2 justify-end cursor-pointer mt-auto">
        <span className="group" role="button" onClick={onUpdate}>
          <IconEditTwoTone className="group-hover:text-warning " />
        </span>
        <span role="button" onClick={onPropose}>
          <IconSendTwoTone />
        </span>
        <span className="group" role="button" onClick={onAddResource}>
          <IconDesign className="group-hover:text-destructive h-[20px] w-[20px]" />
        </span>
        <Link href="/du-an/1">
          <IconEyeTwoTone />
        </Link>
      </div>
    </div>
  );
};

export default DuAnCard;
