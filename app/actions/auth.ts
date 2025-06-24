"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import fs from 'fs/promises'
import path from 'path'

// El nombre de la cookie que usaremos para la sesión
const SESSION_COOKIE_NAME = 'user_session';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const usersPath = path.join(process.cwd(), 'data/users.json');
  const usersData = await fs.readFile(usersPath, 'utf-8');
  const users = JSON.parse(usersData);

  const user = users.find((u: any) => u.email === email && u.password === password);

  if (user) {
    // La función cookies() aquí permite escribir.
    (await
          // La función cookies() aquí permite escribir.
          cookies()).set(SESSION_COOKIE_NAME, user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 día
      path: '/',
    });
    return { success: true };
  }

  return { success: false, error: 'Credenciales inválidas.' };
}

export async function logout() {
  // Aquí también permite escribir para borrar la cookie.
  (await
        // Aquí también permite escribir para borrar la cookie.
        cookies()).set(SESSION_COOKIE_NAME, '', { expires: new Date(0) });
  redirect('/');
}