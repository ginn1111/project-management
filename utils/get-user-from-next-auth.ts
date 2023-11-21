import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const getUserInfoFromNextAuth = async () => {
	try {
		const session = await getServerSession(authOptions);
		const user = session?.user;
		return user;
	} catch (error) {
		console.log(error);
	}
};
