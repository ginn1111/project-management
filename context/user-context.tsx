'use client';

import LoadingInline from '@/components/ui/loading/loading-inline';
import { LocalKeys } from '@/constants/general';
import { initialPrivateRequest } from '@/lib/axios';
import { getFromLocal, setToLocal } from '@/utils/helpers';
import { usePathname, useRouter } from 'next/navigation';
import {
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

const Actions = {
  setUser: 'set/user',
} as const;

type ActionsType<T> = {
  type: ValueOf<typeof Actions>;
  payload: T;
};

type UserActions = ActionsType<IUserContextProps>;

interface IUserContextProps {
  userInfo: Partial<IAccount>;
  accessToken: string;
}

interface IUserContextActions {
  handleSetUserInfo: (payload: IUserContextProps) => void;
}

const INITIAL_STATE: IUserContextProps = {
  userInfo: {},
  accessToken: getFromLocal(LocalKeys.accessToken),
};
const UserContext = createContext<IUserContextActions & IUserContextProps>({
  ...INITIAL_STATE,
  handleSetUserInfo: () => {},
});

const userReducer: Reducer<IUserContextProps, UserActions> = (
  state: IUserContextProps = INITIAL_STATE,
  action: UserActions
) => {
  switch (action.type) {
    case Actions.setUser:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const [isInitial, setIsInitial] = useState(true);
  const pathNameRef = useRef('/nhan-vien');

  useEffect(() => {
    if (!user.accessToken && pathname !== '/authen') {
      router.replace('/authen');
      pathNameRef.current = pathname;
    } else if (user.accessToken) {
      router.replace(pathname === '/authen' ? '/nhan-vien' : pathname);
      initialPrivateRequest(user.accessToken);
    }
    setIsInitial(false);
  }, []);

  const handleSetUserInfo = (payload: IUserContextProps) => {
    dispatch({ type: Actions.setUser, payload });
    setToLocal(LocalKeys.accessToken, payload.accessToken);
    initialPrivateRequest(payload.accessToken);
    router.replace(pathNameRef.current);
  };

  return (
    <UserContext.Provider value={{ ...user, handleSetUserInfo }}>
      {isInitial ? (
        <div
          className="w-screen h-screen relative"
          style={{ width: '100vw', height: '100vh' }}
        >
          <LoadingInline />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
