'use client';
import Chart from 'react-apexcharts';

import { QueryKeys } from '@/constants/query-key';
import useQueryParams from '@/hooks/useQueryParams';
import { StatisticServices } from '@/lib';
import { getMonth, now } from '@/utils/helpers';
import { AxiosError, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import vi from 'dayjs/locale/vi';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'sonner';
import Filter from './filter';
import { isNil } from 'lodash';
import LoadingInline from '@/components/ui/loading/loading-inline';

dayjs.extend(LocalizedFormat);
dayjs.locale(vi);

const D = [
	{
		name: 'Bob',
		data: [
			{
				x: 'Design',
				y: [new Date('2019-03-05').getTime(), new Date('2019-03-08').getTime()],
			},
			{
				x: 'Code',
				y: [new Date('2019-03-02').getTime(), new Date('2019-03-05').getTime()],
			},
			{
				x: 'Code',
				y: [new Date('2019-03-05').getTime(), new Date('2019-03-07').getTime()],
			},
			{
				x: 'Test',
				y: [new Date('2019-03-03').getTime(), new Date('2019-03-09').getTime()],
			},
			{
				x: 'Test',
				y: [new Date('2019-03-08').getTime(), new Date('2019-03-11').getTime()],
			},
			{
				x: 'Validation',
				y: [new Date('2019-03-11').getTime(), new Date('2019-03-16').getTime()],
			},
			{
				x: 'Design',
				y: [new Date('2019-03-01').getTime(), new Date('2019-03-03').getTime()],
			},
		],
	},
	{
		name: 'Joe',
		data: [
			{
				x: 'Design',
				y: [new Date('2019-03-02').getTime(), new Date('2019-03-05').getTime()],
			},
			{
				x: 'Test',
				y: [new Date('2019-03-06').getTime(), new Date('2019-03-16').getTime()],
				goals: [
					{
						name: 'Break',
						value: new Date('2019-03-10').getTime(),
						strokeColor: '#CD2F2A',
					},
				],
			},
			{
				x: 'Code',
				y: [new Date('2019-03-03').getTime(), new Date('2019-03-07').getTime()],
			},
			{
				x: 'Deployment',
				y: [new Date('2019-03-20').getTime(), new Date('2019-03-22').getTime()],
			},
			{
				x: 'Design',
				y: [new Date('2019-03-10').getTime(), new Date('2019-03-16').getTime()],
			},
		],
	},
	{
		name: 'Dan',
		data: [
			{
				x: 'Code',
				y: [new Date('2019-03-10').getTime(), new Date('2019-03-17').getTime()],
			},
			{
				x: 'Validation',
				y: [new Date('2019-03-05').getTime(), new Date('2019-03-09').getTime()],
				goals: [
					{
						name: 'Break',
						value: new Date('2019-03-07').getTime(),
						strokeColor: '#CD2F2A',
					},
				],
			},
		],
	},
];

const DUMMY = [
	{
		id: 1,
		title: 'All Day Event',
		start: now.getFullYear() + '-' + getMonth(now) + '-01T14:30:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-02T14:30:00',
		className: 'danger',
		description:
			'Aenean fermentum quam vel sapien rutrum cursus. Vestibulum imperdiet finibus odio, nec tincidunt felis facilisis eu.',
	},
	{
		id: 2,
		title: 'Site Visit',
		start: now.getFullYear() + '-' + getMonth(now) + '-07T19:30:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-08T14:30:00',
		className: 'primary',
		description:
			'Etiam a odio eget enim aliquet laoreet. Vivamus auctor nunc ultrices varius lobortis.',
	},
	{
		id: 3,
		title: 'Product Lunching Event',
		start: now.getFullYear() + '-' + getMonth(now) + '-17T14:30:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-18T14:30:00',
		className: 'info',
		description:
			'Proin et consectetur nibh. Mauris et mollis purus. Ut nec tincidunt lacus. Nam at rutrum justo, vitae egestas dolor.',
	},
	{
		id: 4,
		title: 'Meeting',
		start: now.getFullYear() + '-' + getMonth(now) + '-12T10:30:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-13T10:30:00',
		className: 'danger',
		description:
			'Mauris ut mauris aliquam, fringilla sapien et, dignissim nisl. Pellentesque ornare velit non mollis fringilla.',
	},
	{
		id: 5,
		title: 'Lunch',
		start: now.getFullYear() + '-' + getMonth(now) + '-12T15:00:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-13T15:00:00',
		className: 'info',
		description:
			'Integer fermentum bibendum elit in egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
	},
	{
		id: 6,
		title: 'Conference',
		start: now.getFullYear() + '-' + getMonth(now) + '-12T21:30:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-13T21:30:00',
		className: 'success',
		description:
			'Curabitur facilisis vel elit sed dapibus. Nunc sagittis ex nec ante facilisis, sed sodales purus rhoncus. Donec est sapien, porttitor et feugiat sed, eleifend quis sapien. Sed sit amet maximus dolor.',
	},
	{
		id: 7,
		title: 'Happy Hour',
		start: now.getFullYear() + '-' + getMonth(now) + '-12T05:30:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-13T05:30:00',
		className: 'info',
		description:
			' odio lectus, porttitor molestie scelerisque blandit, hendrerit sed ex. Aenean malesuada iaculis erat, vitae blandit nisl accumsan ut.',
	},
	{
		id: 8,
		title: 'Dinner',
		start: now.getFullYear() + '-' + getMonth(now) + '-12T20:00:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-13T20:00:00',
		className: 'danger',
		description:
			'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		id: 9,
		title: 'Birthday Party',
		start: now.getFullYear() + '-' + getMonth(now) + '-27T20:00:00',
		end: now.getFullYear() + '-' + getMonth(now) + '-28T20:00:00',
		className: 'success',
		description:
			'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		id: 10,
		title: 'New Talent Event',
		start: now.getFullYear() + '-' + getMonth(now, 1) + '-24T08:12:14',
		end: now.getFullYear() + '-' + getMonth(now, 1) + '-27T22:20:20',
		className: 'danger',
		description:
			'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		id: 11,
		title: 'Other new',
		start: now.getFullYear() + '-' + getMonth(now, -1) + '-13T08:12:14',
		end: now.getFullYear() + '-' + getMonth(now, -1) + '-16T22:20:20',
		className: 'primary',
		description:
			'Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		id: 13,
		title: 'Upcoming Event',
		start: now.getFullYear() + '-' + getMonth(now, 1) + '-15T08:12:14',
		end: now.getFullYear() + '-' + getMonth(now, 1) + '-18T22:20:20',
		className: 'primary',
		description:
			'Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
];

const Workload = () => {
	const { id } = useParams();
	const form = useForm();
	const { searchParams } = useQueryParams({
		initSearchParams: {
			idProject: '',
			startDate: '',
			finishDate: '',
		},
	});

	const { data: statisticData, isFetching } = useQuery<
		AxiosResponse<{ workOfEmployee: IWorksEmployee[] }>
	>({
		queryKey: QueryKeys.statisticWork(
			id as string,
			searchParams.idProject,
			searchParams.startDate,
			searchParams.finishDate
		),
		queryFn: ({ queryKey }) =>
			StatisticServices.statisticWork({
				idProject: queryKey[2] as string,
				searchParams: `startDate=${queryKey[3]}&finishDate=${queryKey[4]}&idEmployee=${queryKey[1]}`,
			}),
		enabled: !!searchParams.idProject && !!id,
		onError: (error) => {
			toast.error((error as AxiosError).response?.data as string);
		},
	});

	const _statisticData = useMemo(() => {
		const _map: Record<string, Record<string, any>> = {
			'Đúng hạn': {},
			'Quá hạn': {},
			Huỷ: {},
		};

		statisticData?.data?.workOfEmployee?.forEach(
			({ worksOfProject, tasksOfWork }) => {
				const workName = worksOfProject?.work?.name ?? ('' as string);
				_map['Đúng hạn'][workName] = [];
				_map['Quá hạn'][workName] = [];
				_map['Huỷ'][workName] = [];

				tasksOfWork?.forEach((task) => {
					const isExpired =
						(task.finishDate &&
							dayjs(task.finishDate).isAfter(task.finishDateET, 'D')) ||
						(!task.finishDate && dayjs().isAfter(task.finishDateET));

					if (!task.task.isActive) {
						_map['Huỷ'][workName].push({
							name: task.task.name,
							percent: task.percentOfDone,
							timeArr: [
								new Date(task.startDate).getTime(),
								new Date(task.finishDateET ?? '').getTime(),
							],
							isCancel: true,
						});
					} else if (isExpired) {
						_map['Quá hạn'][workName].push({
							name: task.task.name,
							percent: task.percentOfDone,
							timeArr: [
								new Date(task.startDate).getTime(),
								new Date(task.finishDate ?? task.finishDateET ?? '').getTime(),
							],
						});
					} else {
						_map['Đúng hạn'][workName].push({
							name: task.task.name,
							percent: task.percentOfDone,
							timeArr: [
								new Date(task.startDate).getTime(),
								new Date(task.finishDate ?? task.finishDateET ?? '').getTime(),
							],
						});
					}
				});
			}
		);

		return Object.entries(_map).map(([type, work]) => ({
			name: type,
			data: Object.entries(work).flatMap(([workName, arr]) =>
				arr.map(({ timeArr, ...rest }: { timeArr: number[][] }) => ({
					x: workName,
					y: timeArr,
					...rest,
				}))
			),
		}));
	}, [statisticData?.data?.workOfEmployee]);

	const events = useMemo(() => {
		return statisticData?.data?.workOfEmployee?.map((work: IWorksEmployee) => {
			const worksOfProject = work.worksOfProject;
			const isExpired =
				(worksOfProject?.finishDate &&
					dayjs(worksOfProject?.finishDate).isAfter(
						worksOfProject?.finishDateET,
						'D'
					)) ||
				dayjs().isAfter(worksOfProject?.finishDateET, 'D');

			const evaluation =
				worksOfProject?.workEvaluation?.[0]?.rankWorkEvaluation?.name;

			return {
				id: work.id,
				title: `${worksOfProject?.work?.name} - ${
					evaluation ?? 'Chưa đánh giá'
				}`,
				start: dayjs(worksOfProject?.startDate).format(),
				end: dayjs(
					worksOfProject?.finishDate ?? worksOfProject?.finishDateET
				).format(),
				className: isExpired ? 'danger' : 'success',
			};
		});
	}, [statisticData?.data?.workOfEmployee]);

	return (
		<div className="relative">
			{isFetching ? <LoadingInline /> : null}
			<FormProvider {...form}>
				<Filter />
			</FormProvider>

			{searchParams?.idProject ? (
				<div className="flex items-center gap-2">
					<p className="text-primary2 bg-primary2-light px-2 py-1 rounded-sm w-max mt-2">
						{events?.length} Đầu việc
					</p>
					<p className="text-primary2 bg-primary2-light px-2 py-1 rounded-sm w-max mt-2">
						{statisticData?.data?.workOfEmployee?.reduce(
							(acc, work) => acc + work.tasksOfWork?.length ?? 0,
							0
						)}{' '}
						Công việc
					</p>
				</div>
			) : null}
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
								const data =
									_statisticData[opts.seriesIndex].data[opts.dataPointIndex];

								console.log(data);

								return `<div class='px-2 py-1 border-primary2 bg-primary2-light'>
							<p class='text-primary2 bg-primary2-light'>${
								data.isCancel ? '' : data?.percent ?? 'Chưa đánh giá'
							} ${!isNil(data?.percent) ? '%' : ''}</p>
							<p class='break-all text-primary2'>${data?.name}</p>
							</div>`;
							},
						},
						chart: {
							fontFamily: 'Nunito, sans-serif',
						},
						xaxis: {
							type: 'datetime',
							labels: {
								format: 'dd/MM HH:mm',
							},
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
						colors: ['#2196f3', '#fbbf24', '#e7515a'],
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

export default Workload;
