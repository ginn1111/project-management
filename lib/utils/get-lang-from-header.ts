import { SupportLangs } from '@/constants/general';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';

export const getLangFromHeader = (request: NextRequest) => {
	const headers = {
		'accept-language': request.headers.get('accept-language') as string,
	};

	const langs = new Negotiator({
		headers,
	}).languages();

	return match(langs, SupportLangs, 'en');
};
