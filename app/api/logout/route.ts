import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const handler = (req: Request) => {
	const url = new URL(req.url);
	cookies().delete('next-auth.session-token');
	return NextResponse.redirect(`${url.origin}/authen`, { status: 308 });
};

export { handler as GET, handler as POST };
