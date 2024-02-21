import { ScrollArea } from '@/components/ui/scroll-area';
import React, { forwardRef, useImperativeHandle } from 'react';
import ItemPhanQuyen from './item-phan-quyen';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import { useQuery } from 'react-query';
import { QueryKeys } from '@/constants/query-key';
import { UtilsServices } from '@/lib';
import { AxiosResponse } from 'axios';
import Loading from '@/components/ui/loading/loading-inline';
import { FormProvider, useForm } from 'react-hook-form';

const PhanQuyen = forwardRef(
	(
		props: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
		ref
	) => {
		const { className, ...restProps } = props;
		const form = useForm();

		useImperativeHandle(ref, () => form);

		const { data: permissionData, isFetching } = useQuery<
			AxiosResponse<{ permissions: IWorkPermission[] }>
		>({
			queryKey: QueryKeys.getPermissionsOfWork(),
			queryFn: UtilsServices.getWorkPermission,
		});

		return (
			<>
				{isFetching ? <Loading /> : null}
				<ScrollArea
					className={cn('h-[200px] w-full rounded-md border p-2', className)}
					{...restProps}
				>
					<FormProvider {...form}>
						{permissionData?.data?.permissions.map((item) => (
							<ItemPhanQuyen key={item.id} {...item} />
						))}
					</FormProvider>
				</ScrollArea>
			</>
		);
	}
);

PhanQuyen.displayName = 'PhanQuyen';

export default PhanQuyen;
