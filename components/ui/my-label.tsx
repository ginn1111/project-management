import React from 'react';
import { Label } from './label';
import * as LabelPrimitive from '@radix-ui/react-label';

export interface IMyLabel
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  required?: boolean;
}

const MyLabel = (props: IMyLabel) => {
  const { children, required, ...rest } = props;
  return (
    <Label {...rest}>
      {children}
      {!required ? (
        <span className="ml-1 text-slate-300 font-light">(optional)</span>
      ) : null}
    </Label>
  );
};

export default MyLabel;
