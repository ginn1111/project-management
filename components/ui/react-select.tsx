import Label, { IMyLabel } from '@/components/ui/my-label';
import { RSTheme } from '@/constants/theme';
import { cn } from '@/lib/utils';
import { ReactNode, useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';
import type { GroupBase, Props } from 'react-select';
import Select from 'react-select';

interface IReactSelect<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
> extends Props {
	options: Option[];
	isMulti?: IsMulti;
	group?: Group;
	title: ReactNode;
	className?: string;
	containerClass?: string;
	control?: Control;
	labelProps?: IMyLabel;
	allowChange?: (oldSnapshot: any, newSnapshot: any) => boolean;
}

const ReactSelect = <
	Option extends { value: string; label: string },
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
>(
	props: IReactSelect<Option, IsMulti, Group>
) => {
	const {
		allowChange,
		labelProps,
		control,
		containerClass,
		className,
		title,
		...rest
	} = props;

	const optionIndex = useMemo(() => {
		if (!rest.isMulti) return {};
		return (
			rest.options?.reduce((acc, option) => {
				acc[option.value] = option;
				return acc;
			}, {} as Record<string, Option>) ?? {}
		);
	}, [rest.isMulti, JSON.stringify(rest.options ?? '')]);

	// fallback for dummy UI
	if (!control) {
		return (
			<div className={cn('custom-select', containerClass)}>
				{title && typeof title === 'string' ? (
					<Label {...labelProps}>{title}</Label>
				) : (
					title
				)}
				<Select
					theme={RSTheme}
					className={cn('!border-none', className)}
					{...rest}
				/>
			</div>
		);
	}
	return (
		<Controller
			name={rest?.name ?? ''}
			control={control}
			render={({ field }) => {
				return (
					<div className={cn('custom-select', containerClass)}>
						{title && typeof title === 'string' ? (
							<Label {...labelProps}>{title}</Label>
						) : (
							title
						)}
						<Select
							theme={RSTheme}
							className={cn('!border-none', className)}
							{...rest}
							onChange={(e: any) => {
								const value =
									(rest.isMulti
										? e.map(({ value }: { value: string }) => value)
										: e?.value) ?? null;
								if (!allowChange || allowChange?.(field.value, value)) {
									field.onChange(value);
								}
								rest?.onChange?.(e, {} as any);
							}}
							value={(() => {
								if (rest.isMulti) {
									return (
										field.value?.map((value: string) => optionIndex[value]) ??
										null
									);
								} else {
									return (
										rest.options.find((o: any) => o.value === field.value) ??
										null
									);
								}
							})()}
						/>
					</div>
				);
			}}
		/>
	);
};

export default ReactSelect;
