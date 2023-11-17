import IconRefresh from '@/components/Icon/IconRefresh';
import IconSearch from '@/components/Icon/IconSearch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LoadingInline from '@/components/ui/loading/loading-inline';
import ReactSelect from '@/components/ui/react-select';
import { QueryKeys } from '@/constants/query-key';
import useQueryParams from '@/hooks/useQueryParams';
import { ProjectServices } from '@/lib';
import { AlertCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

const Filter = () => {
	const form = useForm();
	const { id } = useParams();

	const { data: projectData, isFetching } = useQuery({
		queryKey: QueryKeys.getProject(id as string),
		queryFn: () => ProjectServices.getList(`idEmployee=${id}`),
	});

	const { register } = form;
	const { searchParams, handlePush, handleReset } = useQueryParams({
		initSearchParams: {
			idProject: '',
			startDate: '',
			finishDate: '',
		},
	});

	useEffect(() => {
		form.reset(searchParams);
	}, [JSON.stringify(searchParams)]);

	return (
		<>
			<div className="flex items-center justify-between gap-4 relative">
				{isFetching ? <LoadingInline /> : null}
				<ReactSelect
					control={form.control}
					name="idProject"
					className="min-w-[300px] z-50"
					placeholder="dự án"
					options={
						projectData?.data?.projects?.map(({ id, name }: IProject) => ({
							value: id,
							label: name,
						})) ?? []
					}
					title=""
				/>
				<Input type="date" {...register('startDate')} />
				<Input type="date" {...register('finishDate')} />
				<div className="flex items-center gap-2">
					<Button variant="outline" onClick={() => handleReset()}>
						<IconRefresh />
					</Button>
					<Button
						onClick={() => {
							if (!form.getValues('idProject')) return;
							handlePush({
								...form.getValues(),
							});
						}}
					>
						<IconSearch />
					</Button>
				</div>
			</div>

			{form.watch('idProject') ? null : (
				<Alert className="text-info border-info bg-info-light mt-4">
					<AlertTitle className="flex items-center gap-2">
						<AlertCircle className="w-4 h-4" />
						Info
					</AlertTitle>
					<AlertDescription>Vui lòng chọn một dự án</AlertDescription>
				</Alert>
			)}
		</>
	);
};

export default Filter;
