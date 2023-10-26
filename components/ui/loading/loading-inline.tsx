import { Loader2 } from 'lucide-react';
import React from 'react';

const LoadingInline = () => {
  return (
    <div className="w-full h-full flex items-center justify-center absolute backdrop-blur-sm z-[100]">
      <Loader2 className="text-black animate-spin" />
    </div>
  );
};

export default LoadingInline;
