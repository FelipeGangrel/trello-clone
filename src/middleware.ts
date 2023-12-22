import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import { frontend } from '@/lib/routes'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ['/'],
  afterAuth: (auth, req) => {
    // if logged in and in public route
    if (auth.userId && auth.isPublicRoute) {
      let path = frontend.selectOrganization()

      if (auth.orgId) {
        path = frontend.organization(auth.orgId)
      }

      const orgSelection = new URL(path, req.url)

      return NextResponse.redirect(orgSelection)
    }

    // if not logged in and not in public route
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    // if select and org is not selected we redirect to select org
    if (
      auth.userId &&
      !auth.orgId &&
      req.nextUrl.pathname !== frontend.selectOrganization()
    ) {
      const orgSelection = new URL(frontend.selectOrganization(), req.url)
      return NextResponse.redirect(orgSelection)
    }
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
