import { isEmpty } from 'lodash';

export const formatResourceForm = (
	payload: Record<string, { active?: boolean; number?: number }>
) => {
	if (isEmpty(payload)) return [];
	return Object.entries(payload).reduce(
		(acc, [idResource, { active, number }]) => {
			if (active && number) {
				acc.push({
					id: idResource,
					amount: number,
				});
			}
			return acc;
		},
		[] as { id: string; amount: number }[]
	);
};
