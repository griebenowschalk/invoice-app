import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // If the user is signed in and authorized, .protect() simply returns.
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
// This middleware is used to protect routes in a Next.js application using Clerk for authentication.
// It ensures that only authenticated users can access certain pages, while allowing public access to static files and API routes.
// The `matcher` configuration specifies which routes the middleware should apply to, excluding Next.js internals and static assets.
