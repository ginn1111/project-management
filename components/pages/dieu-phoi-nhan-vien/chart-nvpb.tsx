'use client';
import Chart from 'react-apexcharts';

import useQueryParams from '@/hooks/useQueryParams';
import { getTimeUnit } from '@/utils/helpers';
import dayjs from 'dayjs';
import vi from 'dayjs/locale/vi';
import duration from 'dayjs/plugin/duration';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { omit } from 'lodash';

dayjs.extend(duration);
dayjs.extend(LocalizedFormat);
dayjs.locale(vi);

type ChartNVPBProps = {
	data: {
		employee: IEmployee;
		projects: { project: IProject }[];
	}[];
};

const ChartNVPB = ({ data }: ChartNVPBProps) => {
	const { searchParams } = useQueryParams({
		initSearchParams: {
			startDate: '',
			finishDate: '',
		},
	});
	const mapData: any = {};
	data?.forEach((dataItem) => {
		dataItem.projects.forEach(({ project }) => {
			console.log(project);
			if (!mapData[project.name]) {
				mapData[project.name] = {
					data: [],
				};
			}

			mapData[project.name].data.push({
				x: dataItem.employee.fullName,
				y: [
					dayjs(searchParams.startDate).isValid() &&
					!dayjs(searchParams.startDate).isBefore(project.startDate, 'D')
						? new Date(searchParams.startDate).getTime()
						: new Date(project.startDate).getTime(),
					dayjs(searchParams.finishDate).isValid() &&
					!dayjs(searchParams.finishDate).isAfter(project.finishDateET, 'D')
						? new Date(searchParams.finishDate).getTime()
						: new Date(project.finishDateET).getTime(),
				],
				...project,
			});
		});
	});

	const _statisticData = Object.entries(mapData).map(([projName, value]) => ({
		name: projName,
		data: (value as any).data,
		...omit(value as any, 'data'),
	}));

	const notWorkEmpList = data?.filter(
		(dataItem) => !dataItem?.projects?.length
	);

	return (
		<div className="relative px-[12px]">
			{notWorkEmpList?.length ? (
				<div className="my-4 pb-4 border-dashed border-b border-[#E0E6ED]">
					<p className="text-danger bg-danger-light px-2 py-1 rounded-sm font-md max-w-max">
						Nhân viên đang không có dự án
					</p>
					<p className="pl-4">
						{notWorkEmpList
							.map((dataItem) => dataItem.employee.fullName)
							.join(', ')}
					</p>
				</div>
			) : null}
			<Chart
				type="rangeBar"
				options={{
					grid: {
						borderColor: '#E0E6ED',
						strokeDashArray: 5,
						xaxis: {
							lines: {
								show: true,
							},
						},
						yaxis: {
							lines: {
								show: true,
							},
						},
						padding: {
							top: 0,
							right: 0,
							bottom: 0,
							left: 0,
						},
					},
					tooltip: {
						custom: (opts) => {
							const data: IProject =
								_statisticData[opts.seriesIndex].data[opts.dataPointIndex];

							return `<div class='px-2 py-1 border-primary2 bg-primary2-light'>
							<p class='text-primary2 bg-primary2-light'>${
								data?.startDate
									? dayjs(data.startDate).format('ddd, DD/MM/YYYY')
									: 'N/A'
							} - ${
								data?.finishDateET
									? dayjs(data.finishDateET).format('ddd, DD/MM/YYYY')
									: 'N/A'
							}</p>
							<p class='break-all text-primary2'>${data?.name}</p>
							</div>`;
						},
					},
					chart: {
						fontFamily: 'Nunito, sans-serif',
					},
					dataLabels: {
						enabled: true,
						formatter: (val: [number, number], opts) => {
							const timeUnit = getTimeUnit(
								dayjs(val[1]).diff(val[0], 'second')
							);
							console.log(val);
							const data: IProject =
								_statisticData[opts.seriesIndex].data[opts.dataPointIndex];
							return (
								data.name +
								' - ' +
								((
									dayjs.duration(
										dayjs(new Date(val[1])).diff(new Date(val[0]))
									) as any
								)?.[timeUnit.type as any]() +
									timeUnit.unit)
							);
						},
					},
					xaxis: {
						type: 'datetime',
						labels: {
							format: 'dd/MM',
						},
					},
					plotOptions: {
						bar: {
							horizontal: true,
							dataLabels: {
								hideOverflowingLabels: false,
							},
						},
					},
					legend: {
						position: 'top',
						horizontalAlign: 'left',
					},
				}}
				series={_statisticData}
			/>
		</div>
	);
};

export default ChartNVPB;
