import { cookies } from 'next/headers';

const handler = (req: Request) => {
	const url = new URL(req.url);
	cookies().delete('next-auth.session-token');
	return new Response(undefined, {
		status: 308,
		headers: {
			location: `${url.origin}/authen`,
		},
	});
};

export { handler as GET, handler as POST };
