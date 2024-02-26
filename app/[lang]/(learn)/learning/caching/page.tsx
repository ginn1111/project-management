import { unstable_cache } from 'next/cache';
import RefreshButton from './_refresh-btn';
import RevalidateBtn from './_revalidate-button';
import { Suspense, cache } from 'react';

export const randomImg = cache(async () => {
	const response = await fetch('https://source.unsplash.com/random', {
		next: {
			revalidate: 10,
		},
	});
	return response.url;
});

// this result will cache in Data cache
// So any request will serve only data
export const getTimeWithCache = unstable_cache(
	() =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(new Date().getTime());
			}, 1000);
		}),
	['time'],
	{
		tags: ['time'],
		// revalidate will invalidate Data cache
		// revalidate: 5,
	}
);

export const getTimeWithoutCache = (): Promise<string> =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(new Date().getTime().toString());
		}, 1000);
	});

const TimeCaching = async () => {
	const cacheTime: string = await getTimeWithCache();
	const img = await randomImg();

	return (
		<div>
			<img width={300} height={300} src={img} />
			<div>With cacheTime: {cacheTime}</div>
		</div>
	);
};

const TimeWithoutCaching = async () => {
	const withoutCacheTime: string = await getTimeWithoutCache();
	const img = await randomImg();

	return (
		<div>
			<img width={300} height={300} src={img} />
			<div>Without cacheTime: {withoutCacheTime}</div>
		</div>
	);
};

const CachingPage = async () => {
	return (
		<section>
			<div className="flex justify-between">
				<TimeCaching />
				<Suspense fallback={<div>Loading ...</div>}>
					<TimeWithoutCaching />
				</Suspense>
			</div>
			<div className="flex gap-4">
				<RevalidateBtn />
				<RefreshButton />
			</div>
		</section>
	);
};

export default CachingPage;
