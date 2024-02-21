import { noop } from 'lodash';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import Loading from './loading/loading-inline';

export interface IModalProps<T = any> {
	title: React.ReactNode;
	children: React.ReactNode;
	open: boolean;
	data?: T;
	loading?: boolean;
	onClose?: () => void;
	onRefresh?: () => void;
}

const Modal = ({
	onClose,
	loading = false,
	open,
	title,
	children,
}: IModalProps) => {
	return (
		<Dialog open={open} onOpenChange={onClose ?? noop}>
			<DialogContent className="max-h-[98vh]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				{loading ? <Loading /> : null}
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
