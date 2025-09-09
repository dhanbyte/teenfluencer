// middleware.ts
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/about',
    '/contact',
    '/services'
  ],
  
  // Routes that should always be accessible
  ignoredRoutes: [
    '/api(.*)',      // All API routes
    '/_next(.*)',    // Next.js internal routes
    '/favicon.ico'   // Favicon
  ],
  
  // After sign-in/sign-up, where to redirect
  afterAuth(auth) {
    if (auth.userId && auth.isPublicRoute) {
      // If signed in and trying to access public page, redirect to dashboard
      if (auth.user?.publicMetadata?.role === 'influencer') {
        return Response.redirect(new URL('/influencer/dashboard', auth.url));
      }
      if (auth.user?.publicMetadata?.role === 'brand') {
        return Response.redirect(new URL('/brand/dashboard', auth.url));
      }
    }
  }
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
    '/',                      // Root path
    '/(api|trpc)(.*)'         // API routes
  ],
};