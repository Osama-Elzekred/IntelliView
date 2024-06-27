import { NextResponse } from 'next/server';

export function middleware(request) {
  const authToken = request.cookies.get('authToken')?.value;
  const role = request.cookies.get('role')?.value?.toLowerCase();
  const url = request.nextUrl.clone();

  console.log('authToken:', authToken);
  console.log('url:', url.pathname);
  console.log('role:', role);

  // Define protected routes for user and company
  const companyProtectedRoutes = [
    /^\/profile\/Edit-user-profile/,
    /^\/job\/user-jobs/,
    /^\/job\/(?:[^\/]+)\/apply/,
    /^\/Interview\/Vedio-interview(?:\/[^\/]+)?/,
    /^\/Interview\/review/,
    /^\/Interview\/mocks\/user-mocks/,
    /^\/mockReview(?:\/[^\/]+)?/
  ];

  const userProtectedRoutes = [
    /^\/job\/post/,
    /^\/profile\/Edit-company-profile/,
    /^\/job\/job-company(?:\/[^\/]+)?/,
    /^\/job\/job-company(?:\/[^\/]+)?\/job-application(?:\/[^\/]+)?/,
    /^\/Interview\/review/,
    /^\/Interview\/mockApplicants(?:\/[^\/]+)?/,
    /^\/mockReview(?:\/[^\/]+)?/
  ];

  // Check if the current path is protected based on the role
  const isUserProtectedRoute = userProtectedRoutes.some(regex => regex.test(url.pathname));
  const isCompanyProtectedRoute = companyProtectedRoutes.some(regex => regex.test(url.pathname));

  // Prevent redirect loop for unauthenticated users trying to access protected routes
  if (!authToken && (isUserProtectedRoute || isCompanyProtectedRoute)) {
    if (url.pathname !== '/login') {
      console.log('Redirecting to /login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Prevent redirect loop for authenticated users trying to access the login page
  if (authToken && url.pathname === '/login') {
    console.log('Redirecting to /');
    return NextResponse.redirect(new URL('/', request.url));
  }

 // Handle role-based access for authenticated users
 if (authToken) {
  if (role === 'user') {
    if (isUserProtectedRoute && url.pathname !== '/unauthorized' && url.pathname !== '/' && !url.pathname.startsWith('/profile')) {
      console.log('User role - Redirecting to /unauthorized');
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  } else if (role === 'company') {
    if (isCompanyProtectedRoute && url.pathname !== '/unauthorized' && url.pathname !== '/' && !url.pathname.startsWith('/profile')) {
      console.log('Company role - Redirecting to /unauthorized');
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
}

  return NextResponse.next();
}