/**
 * lib/api.ts
 * Cliente HTTP para todos los módulos de la academia.
 * Usa variables de entorno definidas en .env.local para las URLs.
 */

const API_USUARIOS       = process.env.NEXT_PUBLIC_API_USUARIOS_URL;
const API_ROLES          = process.env.NEXT_PUBLIC_API_ROLES_URL;
const API_INSCRIPCIONES  = process.env.NEXT_PUBLIC_API_INSCRIPCIONES_URL;
const API_NIVELES        = process.env.NEXT_PUBLIC_API_NIVELES_URL;
const API_ASISTENCIA     = process.env.NEXT_PUBLIC_API_ASISTENCIA_URL;
const API_CALIFICACIONES = process.env.NEXT_PUBLIC_API_CALIFICACIONES_URL;

interface LoginResponse {
  token: string;
  user: { id: string; nombre: string; email: string; rol: string };
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(payload.error || payload.message || res.statusText);
  }
  return payload as T;
}

// ===== Roles =====
export async function getRoles(): Promise<{ id: string; nombre: string }[]> {
  if (!API_ROLES) return [];
  return request(`${API_ROLES}/roles`);
}

// ===== Autenticación =====
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  if (!API_USUARIOS) throw new Error('API_USUARIOS no configurada');
  return request<LoginResponse>(`${API_USUARIOS}/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// ===== Usuarios =====
export async function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  phone?: string;
}): Promise<{ id: string; nombre: string; email: string; rol: string }> {
  if (!API_USUARIOS) throw new Error('API_USUARIOS no configurada');
  const payload = {
    nombre: `${data.firstName} ${data.lastName}`,
    email: data.email,
    password: data.password,
    rol: data.userType,
    telefono: data.phone,
  };
  return request(`${API_USUARIOS}/users`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getUserById(userId: string) {
  if (!API_USUARIOS) throw new Error('API_USUARIOS no configurada');
  return request(`${API_USUARIOS}/users/${userId}`);
}

// ===== Niveles =====
export async function getNivelById(nivelId: string) {
  if (!API_NIVELES) throw new Error('API_NIVELES no configurada');
  return request(`${API_NIVELES}/niveles/${nivelId}`);
}

// ===== Asistencia =====
export async function getAsistenciaByAlumnoId(alumnoId: string) {
  if (!API_ASISTENCIA) throw new Error('API_ASISTENCIA no configurada');
  return request(`${API_ASISTENCIA}/asistencias/${alumnoId}`);
}

// ===== Calificaciones =====
export async function getCalificacionesByAlumnoId(alumnoId: string) {
  if (!API_CALIFICACIONES) throw new Error('API_CALIFICACIONES no configurada');
  return request(`${API_CALIFICACIONES}/calificaciones/${alumnoId}`);
}

// ===== Inscripciones =====
export interface InscripcionDTO {
  id: string;
  studentName: string;
  studentAge: string;
  parentName?: string;
  email: string;
  phone: string;
  classType: string;
  experience: string;
  schedule: string;
  medicalInfo?: string;
  comments?: string;
  status?: string;
  submittedAt?: string;
}

/**
 * Envía una nueva inscripción al servicio.
 */
export async function submitInscription(data: Omit<InscripcionDTO, 'id' | 'status' | 'submittedAt'>): Promise<{ success: boolean; message?: string }> {
  if (!API_INSCRIPCIONES) throw new Error('API_INSCRIPCIONES no configurada');
  return request(`${API_INSCRIPCIONES}/inscripciones`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Lista inscripciones, opcionalmente filtrando por estado.
 */
export async function listInscripciones(status?: string): Promise<InscripcionDTO[]> {
  if (!API_INSCRIPCIONES) throw new Error('API_INSCRIPCIONES no configurada');
  const url = status ? `${API_INSCRIPCIONES}/inscripciones?status=${status}` : `${API_INSCRIPCIONES}/inscripciones`;
  return request(url);
}

/**
 * Aprueba una inscripción: cambia estado y crea usuario.
 */
export async function approveInscripcion(id: string): Promise<{ success: boolean; message?: string }> {
  if (!API_INSCRIPCIONES) throw new Error('API_INSCRIPCIONES no configurada');
  return request(`${API_INSCRIPCIONES}/inscripciones/${id}/approve`, { method: 'POST' });
}

/**
 * Rechaza una inscripción (marca estado 'rejected').
 */
export async function rejectInscripcion(id: string): Promise<{ success: boolean; message?: string }> {
  if (!API_INSCRIPCIONES) throw new Error('API_INSCRIPCIONES no configurada');
  return request(`${API_INSCRIPCIONES}/inscripciones/${id}/reject`, { method: 'POST' });
}
