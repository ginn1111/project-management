import { AuthenticationServices } from '@/lib';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import authOptions from './options';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
