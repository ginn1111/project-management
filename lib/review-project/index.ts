import { privateRequest } from '../axios';

const PREFIX_URL = '/project/propose';

export const getList = (searchParams: string) =>
  privateRequest.get(`${PREFIX_URL}/list?${searchParams}`);

export const review = ({
  id,
  stateName,
  note,
}: Partial<ReviewingProposeProject & { stateName: string }>) =>
  privateRequest.post(`${PREFIX_URL}/${id}/review`, {
    stateName,
    note,
  });
