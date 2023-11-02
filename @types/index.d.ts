import { DefaultSession } from 'next-auth';

declare global {
	type ValueOf<T> = T[keyof T];
	interface IRouterParams<
		P extends object = object,
		S extends object = object
	> {
		params: P;
		searchParams: S;
	}
	interface ISidebarItem
		extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
		isMenuChild?: boolean;
		isActive: boolean;
		title: string;
		prefixIcon?: JSX.Element;
		childrenMenu?: any[];
		href?: string;
	}
	interface LayoutProps {
		children: React.ReactNode;
	}

	type OrUndefined<T> = T | undefined;
	type OrNull<T> = T | null;

	interface ISearchParams {
		page: number;
		limit: number;
		search?: string;
		idProject?: string;
	}
}

declare module 'next-auth' {
	interface Session {
		user: { info: IEmployee; accessToken?: string } & DefaultSession['user'];
	}
}

export {};
