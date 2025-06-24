import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE_NAME = 'user_session';

export function middleware(request: NextRequest) {
  // 1. Obtenemos la cookie de sesión de la petición
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  // 2. Si el usuario intenta acceder a cualquier ruta del dashboard...
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // ...y NO tiene una cookie de sesión...
    if (!sessionCookie) {
      // ...lo redirigimos a la página de login.
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 3. Si el usuario está logueado e intenta ir a /login, lo redirigimos al dashboard
  if (request.nextUrl.pathname.startsWith('/login')) {
    if (sessionCookie) {
        return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
  }

  // 4. Si todo está en orden, dejamos que la petición continúe.
  return NextResponse.next();
}

// Especificamos qué rutas queremos que este "guardia" proteja.
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}