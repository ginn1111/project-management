import { privateRequest } from '../axios';

const PREFIX_URL = '/project/propose';

// join to the project

export const getList = (searchParams: string, accessToken?: string) =>
	privateRequest.get(`${PREFIX_URL}/list?${searchParams}`, {
		headers: {
			['x-authorization']: `Bearer ${accessToken}`,
		},
	});

export const review = ({
	id,
	stateName,
	note,
}: Partial<IReviewingProposeProject & { stateName: string }>) =>
	privateRequest.post(`${PREFIX_URL}/${id}/review`, {
		stateName,
		note,
	});
