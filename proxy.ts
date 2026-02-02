import NextAuth from 'next-auth';
import { config } from './auth.config';
const { auth } = NextAuth(config);
export default auth;
