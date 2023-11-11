import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import ItemPhanQuyen from './item-phan-quyen';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import { useQuery } from 'react-query';
import { QueryKeys } from '@/constants/query-key';
import { UtilsServices } from '@/lib';
import { AxiosResponse } from 'axios';
import LoadingInline from '@/components/ui/loading/loading-inline';

const PhanQuyen = (
	props: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
) => {
	const { className, ...restProps } = props;

	const { data: permissionData, isFetching } = useQuery<
		AxiosResponse<{ permissions: IWorkPermission[] }>
	>({
		queryKey: QueryKeys.getPermissionsOfWork(),
		queryFn: UtilsServices.getWorkPermission,
	});

	return (
		<>
			{isFetching ? <LoadingInline /> : null}
			<ScrollArea
				className={cn('h-[200px] w-full rounded-md border p-2', className)}
				{...restProps}
			>
				{permissionData?.data?.permissions.map((item, idx) => (
					<ItemPhanQuyen key={item.id} {...item} />
				))}
			</ScrollArea>
		</>
	);
};

export default PhanQuyen;
