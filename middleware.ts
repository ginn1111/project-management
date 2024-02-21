import { redirect } from 'next/navigation';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest, event: NextFetchEvent) => {
	console.log(request.nextUrl.pathname);

	event.waitUntil(
		new Promise((resolve) =>
			setTimeout(() => {
				resolve('middleware resolve');
				console.log('middleware resolve');
			}, 4000)
		)
	);

	NextResponse.next();
};

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
