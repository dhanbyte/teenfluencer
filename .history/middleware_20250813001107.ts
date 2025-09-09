import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
publicRoutes: ['/', /^\/api.*/, /^\/sign-in.*/, /^\/sign-up.*/],
  debug: false
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};