import IconCalendar from '@/components/Icon/IconCalendar';
import IconEyeTwoTone from '@/components/Icon/IconEyeTwoTone';
import IconSendTwoTone from '@/components/Icon/IconSendTwoTone';
import { Label } from '@/components/ui/label';
import LoadingInline from '@/components/ui/loading/loading-inline';
import { ProjectServices } from '@/lib';
import { cn } from '@/lib/utils';
import { getTimeUnit } from '@/utils/helpers';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

interface IDuAnCard extends IProject {
	onPropose: () => void;
}

const DuAnCard = ({
	id,
	name,
	startDate,
	finishDateET,
	finishDate,
	departments,
	onPropose,
}: IDuAnCard) => {
	const router = useRouter();

	const { mutate: handleToProject, isLoading } = useMutation({
		mutationFn: ProjectServices.inProject,
		onSuccess: (response) => {
			router.push(`/du-an/${response?.data?.idProject}`);
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
	});

	const isExpired =
		(!finishDate && dayjs(finishDateET).isBefore(dayjs(), 'd')) ||
		(finishDate && dayjs(finishDateET).isBefore(finishDate, 'd'));

	const isDone = !!finishDate;

	const isDoneExpired = isExpired && isDone;

	const timeUnit = getTimeUnit(
		dayjs(finishDate ?? finishDateET).diff(startDate, 'second')
	);

	return (
		<div
			className={cn(
				'relative rounded-sm p-2 bg-gradient-from-tl bg-gradient-to-br from-accent to-primary2-light col-span-1 min-h-[200px] transition-all border-2 hover:border-muted-foreground border-transparent hover:from-primary2-light hover:to-accent flex flex-col gap-2',
				{
					['shadow-[0_0_0_4px_success] shadow-success/50']: isDone,
					['shadow-[0_0_0_4px_danger] shadow-danger/50']: isExpired,
					['shadow-[0_0_0_4px_warning] shadow-warning/50']: isDoneExpired,
				}
			)}
		>
			{isLoading ? <LoadingInline /> : null}
			<div className="border-b border-primary pb-1 flex items-start justify-between gap-4">
				<h2 className="text-xl font-medium ">{name}</h2>
				<p className="border-primary bg-accent rounded-md text-primary border p-1 flex-shrink-0 flex items-center gap-2">
					<IconCalendar className="text-sm" />
					<span className="bg-primary rounded-sm text-accent px-1 text-[12px]">
						{dayjs(finishDateET).isValid() && dayjs(startDate).isValid()
							? (
									dayjs.duration(
										dayjs(new Date(finishDate ?? finishDateET)).diff(
											new Date(startDate)
										)
									) as any
							  )?.[timeUnit.type as any]() + timeUnit.unit
							: 'N/A'}
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
				<Label className="text-md mb-0">
					Ngày kết thúc {finishDate ? '' : ' dự kiến'}
				</Label>
				<p>
					{dayjs(finishDate ?? finishDateET).isValid() ? (
						dayjs(finishDate ?? finishDateET).format('DD/MM/YYYY')
					) : (
						<span className="text-danger font-medium">N/A</span>
					)}
				</p>
			</div>
			{/* <div className="flex items-center gap-4 justify-between">
				<Label className="text-md mb-0">Khách hàng</Label>
				<p>Tên khách hàng</p>
			</div> */}
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
				<span role="button" onClick={onPropose}>
					<IconSendTwoTone />
				</span>
				<span role="button" onClick={() => handleToProject(id)}>
					<IconEyeTwoTone />
				</span>
			</div>
		</div>
	);
};

export default DuAnCard;
