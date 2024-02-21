import { Loader2 } from 'lucide-react';
import React from 'react';

const Loading = () => {
	return (
		<div className="w-full h-full bg-white/50 z-[100] flex justify-center items-center">
			<Loader2 className="text-black animate-spin" />
		</div>
	);
};

export default Loading;
