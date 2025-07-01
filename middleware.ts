import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE_NAME = 'user_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  // 1. Proteger rutas bajo /dashboard
  if (pathname.startsWith('/dashboard')) {
    // Si no hay sesión, redirigir a login
    if (!session) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Evitar que usuarios logueados vean /login
  if (pathname === '/login') {
    if (session) {
      // Redirigir según rol sacado de cookie (decoded en cliente) o default admin
      // Para simplificar, enviamos a admin; el cliente luego redirigirá al dashboard correcto
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = '/dashboard/admin';
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // 3. Miembros públicos (home, registro, assets) siguen igual
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/registro', '/dashboard/:path*'],
};
