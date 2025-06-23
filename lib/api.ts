
export async function getRoles() {

  const ROLES_API_URL = process.env.NEXT_PUBLIC_API_ROLES_URL; 

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
  // Corregimos el prefijo de la variable
  const USERS_API_URL = process.env.NEXT_PUBLIC_API_USUARIOS_URL;

  if (!USERS_API_URL) {
    throw new Error("La URL de la API de usuarios no está configurada.");
  }
  // ... el resto de la función de login se mantiene igual ...
  const response = await fetch(`${USERS_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Error en el login.');
  }
  return data;
}

// --- ¡NUEVA FUNCIÓN PARA REGISTRAR USUARIOS! ---
export async function registerUser(userData: any) {
  const USERS_API_URL = process.env.NEXT_PUBLIC_API_USUARIOS_URL;

  if (!USERS_API_URL) {
    throw new Error("La URL de la API de usuarios no está configurada.");
  }

  // Mapeamos los datos del formulario a lo que espera el backend
  const payload = {
    nombre: `${userData.firstName} ${userData.lastName}`,
    email: userData.email,
    password: userData.password,
    rol: userData.userType,
    telefono: userData.phone
  };

  const response = await fetch(`${USERS_API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Error al registrar el usuario.");
  }
  return data;
}

//ASISTENCIA
export async function getUserById(userId: string) {
  const USERS_API_URL = process.env.NEXT_PUBLIC_API_USUARIOS_URL;
  if (!USERS_API_URL) throw new Error("URL de API de usuarios no configurada.");
  const response = await fetch(`${USERS_API_URL}/users/${userId}`);
  if (!response.ok) throw new Error("Error al obtener datos del usuario.");
  return response.json();
}

export async function getNivelById(nivelId: string) {
  const NIVELES_API_URL = process.env.NEXT_PUBLIC_API_NIVELES_URL;
  if (!NIVELES_API_URL) throw new Error("URL de API de niveles no configurada.");
  const response = await fetch(`${NIVELES_API_URL}/niveles/${nivelId}`);
  if (!response.ok) throw new Error("Error al obtener datos del nivel.");
  return response.json();
}

export async function getAsistenciaByAlumnoId(alumnoId: string) {
  const ASISTENCIA_API_URL = process.env.NEXT_PUBLIC_API_ASISTENCIA_URL;
  if (!ASISTENCIA_API_URL) throw new Error("URL de API de asistencia no configurada.");
  // Este es el nuevo endpoint que creamos
  const response = await fetch(`${ASISTENCIA_API_URL}/asistencia/alumno/${alumnoId}`);
  if (!response.ok) throw new Error("Error al obtener historial de asistencia.");
  return response.json();
}

export async function getCalificacionesByAlumnoId(alumnoId: string) {
  const CALIFICACIONES_API_URL = process.env.NEXT_PUBLIC_API_CALIFICACIONES_URL;
  if (!CALIFICACIONES_API_URL) throw new Error("URL de API de calificaciones no configurada.");
  const response = await fetch(`${CALIFICACIONES_API_URL}/calificaciones/alumno/${alumnoId}`);
  if (!response.ok) throw new Error("Error al obtener calificaciones.");
  return response.json();
}

export async function getMaterialesByNivelId(nivelId: string) {
    const MATERIAL_API_URL = process.env.NEXT_PUBLIC_API_MATERIAL_URL;
    if (!MATERIAL_API_URL) throw new Error("URL de API de material no configurada.");
    // Nota: este endpoint en realidad usa la URL de niveles. Esto es algo que podríamos refactorizar.
    const NIVELES_API_URL = process.env.NEXT_PUBLIC_API_NIVELES_URL;
    const response = await fetch(`${NIVELES_API_URL}/niveles/${nivelId}/materiales`);
    if (!response.ok) throw new Error("Error al obtener materiales.");
    return response.json();
}

//inscripcion
export async function submitInscription(formData: any) {
  const INSCRIPCIONES_API_URL = process.env.NEXT_PUBLIC_API_INSCRIPCIONES_URL;

  if (!INSCRIPCIONES_API_URL) {
    throw new Error("La URL de la API de inscripciones no está configurada.");
  }

  const response = await fetch(`${INSCRIPCIONES_API_URL}/inscripciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Error al enviar la inscripción.");
  }
  return data;
}