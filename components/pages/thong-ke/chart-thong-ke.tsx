'use client';
import Chart from 'react-apexcharts';

import Loading from '@/components/ui/loading/loading-inline';
import { QueryKeys } from '@/constants/query-key';
import useQueryParams from '@/hooks/useQueryParams';
import { StatisticServices } from '@/lib';
import { getTimeUnit } from '@/utils/helpers';
import { AxiosError, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import vi from 'dayjs/locale/vi';
import duration from 'dayjs/plugin/duration';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'sonner';

dayjs.extend(LocalizedFormat);
dayjs.locale(vi);
dayjs.extend(duration);

const D = [
	{
		name: 'Actual',
		data: [
			{
				x: 'name',
				y: [new Date('2019-03-10').getTime(), new Date('2019-03-17').getTime()],
				goals: [
					{
						name: 'Expected',
						value: new Date('2019-03-15').getTime(),
						strokeWidth: 2,
						strokeDashArray: 2,
						strokeColor: '#775DD0',
					},
				],
			},
		],
	},
];

const ChartThongKe = () => {
	const { searchParams } = useQueryParams({
		initSearchParams: {
			idProject: '',
			startDate: '',
			finishDate: '',
		},
	});

	const { data: statisticData, isFetching } = useQuery<
		AxiosResponse<{ projects: IProject[] }>
	>({
		queryKey: QueryKeys.statisticProject(
			searchParams.startDate,
			searchParams.finishDate
		),
		queryFn: ({ queryKey }) =>
			StatisticServices.statisticProject(
				`startDate=${queryKey[1]}&finishDate=${queryKey[2]}`
			),
		onError: (error) => {
			toast.error((error as AxiosError).response?.data as string);
		},
	});

	const _statisticData = useMemo(() => {
		const _map: Record<string, Record<string, any>> = {
			'Đúng hạn': {},
			'Đã hoàn thành - quá hạn': {},
			'Chưa hoàn thành - quá hạn': {},
			'Chưa hoàn thành': {},
			Huỷ: {},
		};

		statisticData?.data?.projects?.forEach((project) => {
			const { name, canceledDate, startDate, finishDate, finishDateET } =
				project;
			_map['Đúng hạn'][name] = [];
			_map['Đã hoàn thành - quá hạn'][name] = [];
			_map['Chưa hoàn thành'][name] = [];
			_map['Chưa hoàn thành - quá hạn'][name] = [];
			_map['Huỷ'][name] = [];

			const isExpired =
				(finishDate && dayjs(finishDate).isAfter(finishDateET, 'D')) ||
				(!finishDate && dayjs().isAfter(finishDateET, 'D'));

			const isCancel = !!canceledDate;

			if (isCancel) {
				_map['Huỷ'][name].push({
					timeArr: [
						new Date(startDate).getTime(),
						new Date(finishDateET ?? '').getTime(),
					],
					...project,
				});
			} else if (!finishDate) {
				if (isExpired) {
					_map['Chưa hoàn thành - quá hạn'][name].push({
						timeArr: [
							new Date(startDate).getTime(),
							new Date(finishDateET ?? '').getTime(),
						],
						...project,
					});
				} else {
					_map['Chưa hoàn thành'][name].push({
						timeArr: [
							new Date(startDate).getTime(),
							new Date(finishDateET ?? '').getTime(),
						],
						...project,
					});
				}
			} else if (isExpired) {
				_map['Đã hoàn thành - quá hạn'][name].push({
					timeArr: [
						new Date(startDate).getTime(),
						new Date(finishDate ?? '').getTime(),
					],
					...project,
				});
			} else if (startDate) {
				_map['Đúng hạn'][name].push({
					timeArr: [
						new Date(startDate).getTime(),
						new Date(finishDate ?? '').getTime(),
					],
					...project,
				});
			} else {
			}
		});

		return Object.entries(_map).map(([type, work]) => ({
			name: type,
			data: Object.entries(work).flatMap(([workName, arr]) =>
				arr.map(({ timeArr, ...rest }: { timeArr: number[][] } & IProject) => ({
					x: workName,
					y: timeArr,
					goals: [
						{
							name: 'Break',
							value: !!rest.finishDate
								? new Date(rest.finishDateET).getTime()
								: new Date().getTime(),
							strokeColor: '#CD2F2A',
						},
					],
					...rest,
				}))
			),
		}));
	}, [statisticData?.data?.projects]);

	return (
		<div className="relative">
			{isFetching ? <Loading /> : null}
			<p className="text-primary2 bg-primary2-light px-2 py-1 rounded-sm w-max mt-2">
				{statisticData?.data?.projects?.length} Dự án
			</p>
			{isFetching ? null : (
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

								const isCancel = data.canceledDate;
								const cancelDate = dayjs(data.canceledDate).format(
									'DD/MM/YYYY'
								);

								const timeUnit = getTimeUnit(
									dayjs(data?.finishDate ?? data?.finishDateET).diff(
										data?.startDate,
										'second'
									)
								);

								const customer = data?.customers?.[0]?.customer;

								const resource = data.projectResources
									?.reduce((acc, r) => {
										if (!r.amount) return acc;
										acc.push(`${r.amount} ${r.resource.name}`);
										return acc;
									}, [] as string[])
									.map((item) => `<p class="text-primary2 pl-2">${item}</p>`)
									.join('');
								const numOfWorks = data.worksOfProject?.length;
								const numOfTask = data.worksOfProject?.reduce(
									(acc, work) =>
										acc +
										work?.worksOfEmployee?.reduce(
											(accc, emp) => accc + (emp.tasksOfWork?.length ?? 0),
											0
										),
									0
								);
								return `<div class='px-2 py-1 border-primary2 bg-primary2-light'>
							<p class='break-all text-primary2'>Tên: ${data?.name}</p>
							${
								isCancel
									? `<p class='text-primary2 bg-primary2-light'> Ngày huỷ: ${cancelDate}</p>`
									: `<p class='text-primary2 bg-primary2-light'> Thời gian: ${
											(
												dayjs.duration(
													dayjs(
														new Date(data?.finishDate ?? data?.finishDateET)
													).diff(new Date(data?.startDate))
												) as any
											)?.[timeUnit.type as any]() + timeUnit.unit
									  }</p>`
							}
							<p class='break-all text-primary2'> Phụ trách: ${
								data?.manageProjects?.[0]?.employee?.fullName
							}</p>
							<p class='break-all text-primary2'> Khách hàng: ${
								customer?.fullName ?? 'Không có khách hàng'
							}</p>
							<p class='break-all text-primary2'>Số lượng đầu việc: ${numOfWorks}</p>
							<p class='break-all text-primary2'>Số lượng công việc: ${numOfTask}</p>
							<p class='break-all text-primary2'>Nguồn lực: ${resource || 'Không sử dụng'}</p>
							</div>`;
							},
						},
						chart: {
							fontFamily: 'Nunito, sans-serif',
						},
						xaxis: {
							type: 'datetime',
							labels: {
								format: 'dd/MM/yyyy',
							},
						},
						yaxis: {
							show: false,
						},
						plotOptions: {
							bar: {
								horizontal: true,
								barHeight: '80%',
								dataLabels: {
									hideOverflowingLabels: false,
								},
							},
						},
						fill: {
							type: 'solid',
							opacity: 0.6,
						},
						colors: ['#2196f3', '#fbbf24', '#e7515a', '#3b3f5c', '#ff6666'],
						legend: {
							position: 'top',
							horizontalAlign: 'left',
						},
					}}
					series={_statisticData}
				/>
			)}
		</div>
	);
};

export default ChartThongKe;
