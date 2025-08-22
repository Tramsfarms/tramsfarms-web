// middleware.ts sd
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Handle /vendors paths except /vendors/login
  if (pathname.startsWith("/vendors")) {
    //console.log("yeah");
    if (pathname === "/login") {
      const vendorToken = request.cookies.get("vendors_auth_token");

      // If the token is available, check if a redirect query is present
      if (vendorToken) {
        const redirectTo = searchParams.get("redirect");

        // If there's a redirect URL, navigate to that path
        if (redirectTo) {
          return NextResponse.redirect(new URL(redirectTo, request.url));
        }

        // If no redirect query is present, redirect to a default vendors dashboard or homepage
        return NextResponse.redirect(new URL("/vendors", request.url));
      }

      return NextResponse.next(); // Let the request continue to /vendors/login if no token
    }

    if (pathname.startsWith("/register")) {
      return NextResponse.next();
    }

    //Check for vendors' specific cookie for other /vendors paths
    const vendorToken = request.cookies.get("vendors_auth_token");
    if (!vendorToken) {
      // Redirect to /vendors/login if the token is missing
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Handle /dashboard paths except /dashboard/login
  if (pathname.startsWith("/dashboard")) {
    if (pathname === "/dashboard/login") {
      const dashboardToken = request.cookies.get("dashboard_auth_token");

      // If the token is available, check if a redirect query is present
      if (dashboardToken) {
        const redirectTo = searchParams.get("redirect");

        // Redirect to the query path if available
        if (redirectTo) {
          return NextResponse.redirect(new URL(redirectTo, request.url));
        }

        // Redirect to the default dashboard page if no redirect query
        return NextResponse.redirect(new URL("/dashboard/home", request.url));
      }

      return NextResponse.next(); // Let the request continue to /dashboard/login if no token
    }

    // Check for dashboard-specific cookie for other /dashboard paths
    const dashboardToken = request.cookies.get("dashboard_auth_token");
    if (!dashboardToken) {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
  }

  return NextResponse.next(); // Let the request continue for all other paths
}

export const config = {
  matcher: ["/vendors/:path*", "/dashboard/:path*"], // Apply to all /vendors/* and /dashboard/* paths
};
