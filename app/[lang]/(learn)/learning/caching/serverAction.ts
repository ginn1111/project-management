export const serverAction = async () => {
	'use server';
	revalidateTag('time');
};
