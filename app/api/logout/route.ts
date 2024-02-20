import { cookies } from 'next/headers';

const handler = (req: Request) => {
	const url = new URL(req.url);
	cookies().delete('next-auth.session-token');
	console.log('run here');
	return new Response(undefined, {
		status: 308,
		headers: {
			location: `${url.origin}`,
		},
	});
};

export { handler as GET, handler as POST };
