import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {

            const isLoggedIn = !!auth?.user;
            const isOnLoginPage = nextUrl.pathname.startsWith('/login');
            if (!isOnLoginPage) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                let newUrl = new URL('/', nextUrl);
                console.log("!!! newUrl: ", newUrl);
                return Response.redirect(newUrl);
            }
            return true;
        },
    },
    session: {
        maxAge: 24 * 60 * 60,
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;