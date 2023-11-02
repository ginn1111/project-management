import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const BASE_URL = 'http://localhost:8080';

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

const initialPrivateRequest = () => {
	const privateRequest = axios.create({
		baseURL: BASE_URL,
	});

	privateRequest.interceptors.request.use(async (config) => {
		const session = await getSession();
		if (session?.user.accessToken)
			config.headers['x-authorization'] = `Bearer ${session?.user.accessToken}`;

		return config;
	});

	privateRequest.interceptors.response.use(
		(response) => {
			return Promise.resolve(response)
		},
		async (error: AxiosError) => {
			if (error.response?.status === 401 || error.response?.status === 403) {
				redirect('/api/logout');
			}

			return Promise.reject(error)
		}
	);

	return privateRequest;
};

export const privateRequest = initialPrivateRequest();
