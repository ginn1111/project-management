import React from 'react';

async function fakeFetchNonCriticalContent() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const randomError = false;
			if (randomError) {
				reject('fakeFetchNonCriticalContent error');
			} else {
				resolve('fakeFetch');
			}
		}, 2000);
	});
}

const NonCriticalContent = async () => {
	const nonCriticalContentData = await fakeFetchNonCriticalContent();
	return <div className="text-xl">NonCriticalContent</div>;
};

export default NonCriticalContent;