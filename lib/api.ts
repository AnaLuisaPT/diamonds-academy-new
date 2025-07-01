// lib/api.ts
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
    credentials: 'include',  // Incluye la cookie user_session
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
export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  return request<LoginResponse>(`${API_USUARIOS}/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// ===== Usuarios =====
export interface UserDTO {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  telefono?: string;
  nivel_actual_id?: string;
}

export async function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  phone?: string;
}): Promise<UserDTO> {
  const payload = {
    nombre: `${data.firstName} ${data.lastName}`,
    email: data.email,
    password: data.password,
    rol: data.userType,
    telefono: data.phone,  // coincide con el backend
  };
  return request<UserDTO>(`${API_USUARIOS}/users`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getUserById(userId: string): Promise<UserDTO> {
  return request<UserDTO>(`${API_USUARIOS}/users/${userId}`);
}

export async function listUsers(
  params?: { search?: string; role?: string; nivel?: string }
): Promise<UserDTO[]> {
  const qs = new URLSearchParams();
  if (params?.search) qs.set('search', params.search);
  if (params?.role)   qs.set('role', params.role);
  if (params?.nivel)  qs.set('nivel', params.nivel);
  const query = qs.toString() ? `?${qs.toString()}` : '';
  return request<UserDTO[]>(`${API_USUARIOS}/users${query}`);
}

export async function updateUser(
  id: string,
  data: Partial<Omit<UserDTO, 'id'>>
): Promise<UserDTO> {
  return request<UserDTO>(`${API_USUARIOS}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteUser(
  id: string
): Promise<{ success: boolean; message?: string }> {
  return request<{ success: boolean; message?: string }>(
    `${API_USUARIOS}/users/${id}`,
    { method: 'DELETE' }
  );
}

/** Asigna o quita un nivel a un usuario */
export async function asignarNivel(
  userId: string,
  nivelId: string   // cadena vacía para desasignar
): Promise<{ success: boolean; message?: string }> {
  return request<{ success: boolean; message?: string }>(
    `${API_USUARIOS}/users/${userId}/nivel`,
    {
      method: "POST",
      body: JSON.stringify({ nivel_id: nivelId }),
    }
  );
}

// ===== Niveles =====
export interface NivelDTO {
  id: string;
  nombre: string;
  rango_edad: string;
  horario: string;
  tipo_nivel_id: string;
  instructor_id: string;
  cupos_maximos: number;
  cupos_actuales: number;
}

/** Crea un nuevo nivel (clase) */
export async function createNivel(data: {
  nombre: string;
  tipo_nivel_id: string;
  instructor_id: string;
  rango_edad: string;
  horario: string;
  cupos_maximos: number;
}): Promise<NivelDTO> {
  return request<NivelDTO>(`${API_NIVELES}/niveles`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/** Lista todos los niveles */
export async function listNiveles(): Promise<NivelDTO[]> {
  return request<NivelDTO[]>(`${API_NIVELES}/niveles`);
}

/** Obtiene un nivel por ID */
export async function getNivelById(nivelId: string): Promise<NivelDTO> {
  return request<NivelDTO>(`${API_NIVELES}/niveles/${nivelId}`);
}

/** Actualiza un nivel (incluyendo cupos_actuales) */
export async function updateNivel(
  id: string,
  data: Partial<Omit<NivelDTO, 'id'>>
): Promise<NivelDTO> {
  return request<NivelDTO>(`${API_NIVELES}/niveles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/** Elimina un nivel */
export async function deleteNivel(id: string): Promise<void> {
  await request<void>(`${API_NIVELES}/niveles/${id}`, { method: 'DELETE' });
}

/** Todos los niveles de un tipo */
export async function listNivelesByTipo(tipoId: string): Promise<NivelDTO[]> {
  return request<NivelDTO[]>(`${API_NIVELES}/niveles/tipo/${tipoId}`);
}

/** Niveles disponibles (cupo) de un tipo */
export async function listNivelesDisponibles(tipoId: string): Promise<NivelDTO[]> {
  return request<NivelDTO[]>(
    `${API_NIVELES}/niveles/tipo/${tipoId}/cupo`
  );
}

/** Lista alumnos (rol=alumno) filtrando por nivel */
export async function listAlumnosByNivel(
  nivelId: string
): Promise<UserDTO[]> {
  const qs = new URLSearchParams({ role: "alumno", nivel: nivelId });
  return request<UserDTO[]>(`${API_USUARIOS}/users?${qs.toString()}`);
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

export async function updateInscripcion(
  id: string,
  data: Partial<InscripcionDTO>
): Promise<{ success: boolean; message?: string }> {
  return request<{ success: boolean; message?: string }>(
    `${API_INSCRIPCIONES}/inscripciones/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
}
