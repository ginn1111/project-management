import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItemNguonLuc from './item-nguon-luc';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import Search from '@/components/ui/search';
import { useQuery } from 'react-query';
import { QueryKeys } from '@/constants/query-key';
import { getResourceTypeList } from '@/lib/utils/resource-type';
import { AxiosResponse } from 'axios';
import Loading from '@/components/ui/loading/loading-inline';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ResourceProjectServices, ResourceServices } from '@/lib';
import { debounce } from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';

interface IThemNguonLuc {
	type?: 'resource' | 'resourceOfProject';
	idProject?: string;
	scrollAreaProps?: React.ComponentPropsWithoutRef<
		typeof ScrollAreaPrimitive.Root
	>;
}

const ThemNguonLuc = forwardRef((props: IThemNguonLuc, ref) => {
	const { type = 'resource', idProject, scrollAreaProps } = props;
	const { className, ...restScrollAreaProps } = scrollAreaProps ?? {};

	const form = useForm();

	useImperativeHandle(ref, () => form);

	const { data: resourceTypeData, isFetching } = useQuery<
		AxiosResponse<IResourceType[]>
	>({
		queryKey: QueryKeys.getResourceType(),
		queryFn: getResourceTypeList,
	});

	const [selectedTab, setSelectedTab] = useState<IResourceType['id']>('');
	const [search, setSearch] = useState('');

	const { data: resourceData, isFetching: fetchingResource } = useQuery<
		AxiosResponse<{ resource: IResource[]; totalItems: number }>
	>({
		queryKey: QueryKeys.getResource(selectedTab, search),
		queryFn: ({ queryKey }) => {
			return ResourceServices.getList(
				`idResourceType=${queryKey[1]}&search=${queryKey[2]}`
			);
		},
		enabled: type === 'resource' && !!selectedTab,
	});

	const { data: resourceOfProjData, isFetching: fetchingResourceOfProj } =
		useQuery<
			AxiosResponse<{ projectResource: IResourceProject[]; totalItems: number }>
		>({
			queryKey: QueryKeys.getResource(selectedTab, search, idProject ?? ''),
			queryFn: ({ queryKey }) => {
				return ResourceProjectServices.getList({
					idProject: queryKey[3] as string,
					searchParams: `idResourceType=${queryKey[1]}&search=${queryKey[2]}`,
				});
			},
			enabled: type === 'resourceOfProject' && !!selectedTab,
		});

	const resourceList =
		type === 'resource'
			? resourceData?.data?.resource
			: resourceOfProjData?.data?.projectResource.map((pResource) => ({
					...pResource,
					isActive: pResource.resource.isActive,
			  }));

	useEffect(() => {
		setSelectedTab(resourceTypeData?.data?.[0]?.id ?? '');
	}, [resourceTypeData?.data]);

	return (
		<div>
			<Tabs className="mb-2 relative" value={selectedTab}>
				{isFetching ? <Loading /> : null}
				<TabsList className="w-full">
					{resourceTypeData?.data?.map(({ id, name }) => (
						<TabsTrigger
							onClick={() => setSelectedTab(id)}
							key={id}
							className="flex-1"
							value={id}
						>
							{name}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>

			<Search
				onChange={debounce((e) => setSearch(e.target.value), 300)}
				classNameContainer="mb-2 text-sm"
				placeholder="tên nguồn lực"
			/>
			<ScrollArea
				className={cn(
					'h-[200px] w-full rounded-md border px-4 py-2',
					className
				)}
				{...restScrollAreaProps}
			>
				{fetchingResource || fetchingResourceOfProj ? <Loading /> : null}
				<FormProvider {...form}>
					{resourceList?.map((resource, idx) => {
						let payload: Partial<IResource | IResourceProject> = {};
						if (isResource(type, resource)) {
							payload = resource;
						} else if (isResourceOfProj(type, resource)) {
							payload = {
								...resource,
								name: resource.resource.name,
							};
						}

						return (
							<ItemNguonLuc
								{...payload}
								key={payload?.id ?? (idx.toString() as string)}
							/>
						);
					})}
				</FormProvider>
			</ScrollArea>
		</div>
	);
});

ThemNguonLuc.displayName = 'ThemNguonLuc';

const isResource = (
	type: 'resource' | 'resourceOfProject',
	r: IResource | IResourceProject
): r is IResource => {
	return type === 'resource';
};

const isResourceOfProj = (
	type: 'resource' | 'resourceOfProject',
	r: IResource | IResourceProject
): r is IResourceProject => {
	return type === 'resourceOfProject';
};

export default ThemNguonLuc;
