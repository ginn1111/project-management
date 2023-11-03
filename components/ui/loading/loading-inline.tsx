import { Loader2 } from 'lucide-react';
import React from 'react';

const LoadingInline = () => {
	return (
		<div className="w-full h-full flex items-center justify-center absolute bg-white/50 z-[100]">
			<Loader2 className="text-black animate-spin" />
		</div>
	);
};

export default LoadingInline;
