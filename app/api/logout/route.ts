import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const handler = () => {
	cookies().delete('next-auth.session-token');
	return NextResponse.redirect(process.env.NEXTAUTH_URL as string);
};

export { handler as GET, handler as POST };
