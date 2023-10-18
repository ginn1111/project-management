import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

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
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted()) {
      const searchParams = new URLSearchParams(initialSearchParams);
      window.history.pushState(
        '',
        '',
        `${pathname}?${searchParams.toString()}`
      );
    }
  }, []);

  const handlePush = (obj: Record<string, any>) => {
    const newSearchParams = Object.assign(initialSearchParams, {
      ...obj,
    });
    router.push(
      `${pathname}?${new URLSearchParams(newSearchParams).toString()}`
    );
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
