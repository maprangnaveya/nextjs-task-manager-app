import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

import { authConfig } from './auth.config';
import type { User } from '@/app/lib/definitions';

const users: Array<User> = [
    {
        id: "221",
        name: "Sherlock",
        username: "sherlock.h",
        password: "iamsherlockholmes",
    },
    {
        id: "222",
        name: "John",
        username: "john.w",
        password: "iamjohnwatson",
    },
    {
        id: "223",
        name: "Hudson",
        username: "mrs.hudson",
        password: "iamnotyourhousekeeper",
    },
]

async function getUser(username: string): Promise<User | undefined> {
    try {
        const user = users.find(user => user.username == username)
        if (user) {
            return user
        } else {
            throw new Error('Your password or username is incorrect.');
        }
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z.object({ username: z.string(), password: z.string().min(6) }).safeParse(credentials);
            if (parsedCredentials.success) {
                const { username, password } = parsedCredentials.data;
                const user = await getUser(username);
                if (!user) return null;

                // const passwordsMatch = await bcrypt.compare(password, user.password);
                const passwordsMatch = password == user.password;

                if (passwordsMatch) return user;
            }
            console.log('Invalid credentials');
            return null;
        }
    })],
});