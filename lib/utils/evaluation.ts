import { publicRequest } from '../axios';

export const getRankEvaluationWork = () =>
	publicRequest.get('/utils/rank-evaluation-work');
