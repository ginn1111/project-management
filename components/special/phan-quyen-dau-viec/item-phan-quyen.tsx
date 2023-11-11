import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const ItemPhanQuyen = (props: IWorkPermission) => {
	const form = useFormContext();
	const { id, name } = props;
	return (
		<div className="flex items-center gap-4 my-4">
			<Checkbox
				id={id}
				name={id}
				checked={form.watch(id)}
				onCheckedChange={(checked) => form.setValue(id, checked)}
			/>
			<Label htmlFor={id} className="mb-0">
				{name}
			</Label>
		</div>
	);
};

export default ItemPhanQuyen;
