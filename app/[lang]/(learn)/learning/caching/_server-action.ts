'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const serverAction = async () => {
	console.log('server action running...');
	await new Promise((resolve) =>
		setTimeout(() => {
			resolve('server action resolve');
		}, 1000)
	);

	// revalidate pure the Data cache of tag "time"
	// after that make server re-rendering Server Component -> RSC payload
	// this payload will merge with the RSC payload in the client
	revalidatePath('/vi/learning/caching');
};
