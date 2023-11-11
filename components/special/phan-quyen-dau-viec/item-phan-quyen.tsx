import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React from 'react';

const ItemPhanQuyen = (props: IWorkPermission) => {
	const { id, name } = props;
	return (
		<div className="flex items-center gap-4 my-4">
			<Checkbox />
			<Label className="mb-0">{name}</Label>
		</div>
	);
};

export default ItemPhanQuyen;
