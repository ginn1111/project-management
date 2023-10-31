import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { forwardRef, useImperativeHandle, useState } from 'react';

interface IReactSheet extends SheetPrimitive.DialogContentProps {}

const ReactSheet = forwardRef(
	<T extends { open: boolean } = any>(props: IReactSheet, ref: any) => {
		const [sheet, setSheet] = useState<T | undefined>();
		const { children, title, ...rest } = props;

		const handleOpen = (options?: Record<string, any>) =>
			setSheet((old) => ({ ...old, open: true, ...options } as T | undefined));
		const handleClose = (options?: Record<string, any>) =>
			setSheet((old) => ({ ...old, open: false, ...options } as T | undefined));

		useImperativeHandle(ref, () => ({
			sheet,
			setSheet,
			handleOpen,
			handleClose,
		}));

		return (
			<Sheet open={sheet?.open} onOpenChange={() => handleClose()}>
				<SheetContent {...rest}>
					<SheetHeader>
						<SheetTitle>{title}</SheetTitle>
						<SheetDescription>{children}</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		);
	}
);

ReactSheet.displayName = 'ReactSheet';

export default ReactSheet;
