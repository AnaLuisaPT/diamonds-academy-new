// Esta función se conectará a tu 'roles-service' para obtener todos los roles.
export async function getRoles() {
  // Leemos la URL base desde el archivo .env.local que ya configuraste.
  const ROLES_API_URL = process.env.NEXT_PUBLIC_API_ROLES_URL; // O NEXT_PUBLIC_... dependiendo de tu framework

  // Es una buena práctica verificar que la URL se cargó correctamente.
  if (!ROLES_API_URL) {
    console.error("URL del servicio de Roles no encontrada. Revisa el archivo .env.local");
    // Devolvemos una lista vacía para que la aplicación no se rompa.
    return [];
  }

  try {
    // Hacemos la petición GET al endpoint /roles
    const response = await fetch(`${ROLES_API_URL}/roles`);

    if (!response.ok) {
      throw new Error(`La respuesta de la red no fue exitosa: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Devuelve la lista de roles

  } catch (error) {
    console.error('Error al obtener los roles:', error);
    return []; // Devuelve una lista vacía si hay un error
  }
}

export async function loginUser(email: string, password: string) {
  const USERS_API_URL = process.env.NEXT_PUBLIC_API_USUARIOS_URL; // Asegúrate de usar NEXT_PUBLIC_ si usas Next.js

  if (!USERS_API_URL) {
    throw new Error("La URL de la API de usuarios no está configurada.");
  }

  const response = await fetch(`${USERS_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Error en el login.');
  }
  return data; // Devuelve { message, token, user }
}

// Aquí puedes añadir más funciones en el futuro...
// export async function getSucursales() { ... }