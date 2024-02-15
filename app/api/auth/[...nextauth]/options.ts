import { AuthenticationServices } from '@/lib';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Tài khoản',
					type: 'text',
					placeholder: 'nhập tài khoản',
				},
				password: {
					label: 'Mật khẩu',
					type: 'password',
					placeholder: 'nhập mật khẩu',
				},
			},
			async authorize(credentials) {
				try {
					console.log(credentials);
					const user = await AuthenticationServices.login(
						credentials as Record<'username' | 'password', string>,
					);
					console.log('user.data', user.data);
					return user.data;
				} catch (error) {
					console.log(error);
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (typeof user !== 'undefined') {
				return user as unknown as JWT;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				(session as any).user = token as unknown as IEmployee;
				return session;
			}
			return session;
		},
	},
	pages: {
		signIn: '/authen',
	},
};

export default authOptions;
