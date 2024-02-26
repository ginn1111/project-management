import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const handler = (
	req: NextRequest,
	{ params }: { params: { lang: string } }
) => {
	const cookieList = cookies();
	if (!cookieList.has('next-auth.session-token')) {
		return NextResponse.redirect(`${req.nextUrl.origin}/authen`, {
			status: 308,
		});
	}

	return NextResponse.redirect(`${req.nextUrl.origin}/${params.lang}/du-an`, {
		status: 307,
	});
};

export { handler as GET, handler as POST };
