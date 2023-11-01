import { AuthenticationServices } from '@/lib';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
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
					const user = await AuthenticationServices.login(
						credentials as Record<'username' | 'password', string>
					);
					return user.data;
				} catch (error) {
					console.log(error);
					return null;
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
				session.user = token as unknown as IEmployee;
				return session;
			}
			return session;
		},
	},
	pages: {
		signIn: '/authen',
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
