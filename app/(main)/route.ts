import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const handler = (req: Request) => {
	const url = new URL(req.url);
	const cookieList = cookies();
	if (!cookieList.has('next-auth.session-token')) {
		return NextResponse.redirect(`${url.origin}/authen`, { status: 308 });
	}

	return NextResponse.redirect(`${url.origin}/du-an`, { status: 307 });
};

export { handler as GET, handler as POST };
