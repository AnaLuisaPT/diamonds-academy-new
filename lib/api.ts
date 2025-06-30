/**
 * lib/api.ts
 * Cliente HTTP para todos los módulos de la academia.
 * Usa variables de entorno definidas en .env.local para las URLs.
 */

const API_USUARIOS       = process.env.NEXT_PUBLIC_API_USUARIOS_URL!;
const API_ROLES          = process.env.NEXT_PUBLIC_API_ROLES_URL!;
const API_INSCRIPCIONES  = process.env.NEXT_PUBLIC_API_INSCRIPCIONES_URL!;
const API_NIVELES        = process.env.NEXT_PUBLIC_API_NIVELES_URL!;
const API_ASISTENCIA     = process.env.NEXT_PUBLIC_API_ASISTENCIA_URL!;
const API_CALIFICACIONES = process.env.NEXT_PUBLIC_API_CALIFICACIONES_URL!;
const API_MATERIAL       = process.env.NEXT_PUBLIC_API_MATERIAL_URL!;

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload.error || payload.message || res.statusText);
  return payload as T;
}

// ===== Roles =====
export async function getRoles(): Promise<{ id: string; nombre: string }[]> {
  return API_ROLES ? request(`${API_ROLES}/roles`) : [];
}

// ===== Autenticación =====
export interface LoginResponse {
  token: string;
  user: { id: string; nombre: string; email: string; rol: string };
}
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
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
  return request(`${API_USUARIOS}/users/${userId}`);
}

// ===== Niveles =====
export async function getNivelById(nivelId: string) {
  return request(`${API_NIVELES}/niveles/${nivelId}`);
}

// ===== Asistencia =====
export async function getAsistenciaByAlumnoId(alumnoId: string) {
  return request(`${API_ASISTENCIA}/asistencia/alumno/${alumnoId}`);
}

// ===== Calificaciones =====
export async function getCalificacionesByAlumnoId(alumnoId: string) {
  return request(`${API_CALIFICACIONES}/calificaciones/alumno/${alumnoId}`);
}

// ===== Materiales =====
export async function getMaterialesByNivelId(nivelId: string) {
  return request(`${API_MATERIAL}/niveles/${nivelId}/materiales`);
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

export async function submitInscripcion(
  data: Omit<InscripcionDTO, "id" | "status" | "submittedAt">
): Promise<{ success: boolean; message?: string }> {
  return request<{ success: boolean; message?: string }>(
    `${API_INSCRIPCIONES}/inscripciones`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function listInscripciones(
  status?: string
): Promise<InscripcionDTO[]> {
  const url = status
    ? `${API_INSCRIPCIONES}/inscripciones?status=${status}`
    : `${API_INSCRIPCIONES}/inscripciones`;
  return request<InscripcionDTO[]>(url);
}

export async function approveInscripcion(
  id: string
): Promise<{ success: boolean; message?: string }> {
  return request(`${API_INSCRIPCIONES}/inscripciones/${id}/approve`, {
    method: "POST",
  });
}

export async function rejectInscripcion(
  id: string
): Promise<{ success: boolean; message?: string }> {
  return request<{ success: boolean; message?: string }>(
    `${API_INSCRIPCIONES}/inscripciones/${id}/reject`,
    { method: "DELETE" }
  );
}