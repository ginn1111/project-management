import { privateRequest } from '../axios';

const PREFIX_URL = '/project/propose';

// join to the project

export const getList = (searchParams: string) =>
	privateRequest.get(`${PREFIX_URL}/list?${searchParams}`);

export const review = ({
	id,
	stateName,
	note,
}: Partial<IReviewingProposeProject & { stateName: string }>) =>
	privateRequest.post(`${PREFIX_URL}/${id}/review`, {
		stateName,
		note,
	});
