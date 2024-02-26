import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { SupportLangs } from './constants/general';
import { getLangFromHeader } from './lib/utils/get-lang-from-header';

export const middleware = (request: NextRequest, event: NextFetchEvent) => {
	const pathname = request.nextUrl.pathname;

	const hasLocale = SupportLangs.some((lang) =>
		pathname.startsWith(`/${lang}`)
	);

	if (hasLocale) return;

	const lang = getLangFromHeader(request);
	request.nextUrl.pathname = `/${lang}${pathname}`;

	// event.waitUntil(
	// 	new Promise((resolve) =>
	// 		setTimeout(() => {
	// 			resolve('middleware resolve');
	// 			console.log('middleware resolve');
	// 		}, 4000)
	// 	)
	// );

	return NextResponse.redirect(request.nextUrl);
};

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
