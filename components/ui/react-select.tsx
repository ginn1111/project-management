import { RSTheme } from '@/constants/theme';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import type { GroupBase, default as SelectProps, Props } from 'react-select';
import Select from 'react-select';
import { Label } from './label';
import { Control, Controller } from 'react-hook-form';

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
}

const ReactSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: IReactSelect<Option, IsMulti, Group>
) => {
  const { control, containerClass, className, title, ...rest } = props;
  // fallback for dummy UI
  if (!control) {
    return (
      <div className={cn('custom-select', containerClass)}>
        {title && typeof title === 'string' ? <Label>{title}</Label> : title}
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
              <Label>{title}</Label>
            ) : (
              title
            )}
            <Select
              theme={RSTheme}
              className={cn('!border-none', className)}
              {...rest}
              onChange={(e: any) => {
                field.onChange(e.value);
                rest?.onChange?.(e, {} as any);
              }}
              value={
                rest.options.find((o: any) => o.value === field.value) ?? null
              }
            />
          </div>
        );
      }}
    />
  );
};

export default ReactSelect;
