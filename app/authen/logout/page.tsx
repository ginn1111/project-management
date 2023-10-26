'use client';

import { clearLocal } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    clearLocal(() => {
      router.replace('/authen');
    });
  }, []);

  return null;
};

export default Logout;
