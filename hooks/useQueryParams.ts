import { isEmpty } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface IUseQueryParams {
  initSearchParams: Record<string, any>;
}

const useQueryParams = ({ initSearchParams }: IUseQueryParams) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSearchParams = Object.keys(initSearchParams).reduce(
    (acc, key) => {
      const value = searchParams.get(key);
      if (typeof value === 'number') {
        acc[key] = (parseInt(value) && value !== 0) || initSearchParams[key];
      } else {
        acc[key] = value ?? initSearchParams[key];
      }
      return acc;
    },
    {} as Record<string, any>
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(initialSearchParams);
    window.history.pushState('', '', `${pathname}?${searchParams.toString()}`);
  }, [pathname]);

  const handlePush = (obj: Record<string, any>) => {
    if (isEmpty(obj)) {
      router.push(
        `${pathname}?${new URLSearchParams(initSearchParams).toString()}`
      );
    } else {
      const newSearchParams = Object.assign(initialSearchParams, {
        ...obj,
      });
      router.push(
        `${pathname}?${new URLSearchParams(newSearchParams).toString()}`
      );
    }
  };

  const handleReplace = (key: string, value: any) => {
    router.replace(`${pathname}?${key}=${value}`);
  };

  const handleReset = () => {
    router.push(
      `${pathname}?${new URLSearchParams(initSearchParams).toString()}`
    );
  };

  return {
    handlePush,
    handleReplace,
    handleReset,
    searchParams: initialSearchParams,
  };
};

export default useQueryParams;
