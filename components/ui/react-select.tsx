import { RSTheme } from '@/constants/theme';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import type { GroupBase, default as SelectProps, Props } from 'react-select';
import Select from 'react-select';
import { Label } from './label';

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
}

const ReactSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: IReactSelect<Option, IsMulti, Group>
) => {
  const { containerClass, className, title, ...rest } = props;
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
};

export default ReactSelect;
