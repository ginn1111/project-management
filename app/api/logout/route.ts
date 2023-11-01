import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const handler = () => {
	cookies().delete('next-auth.session-token');
	return NextResponse.redirect('http://localhost:3000/authen');
};

export { handler as GET, handler as POST };
