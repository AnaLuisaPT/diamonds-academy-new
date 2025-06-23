"use client"
import { jwtDecode } from "jwt-decode";
import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, BookOpen, ClipboardCheck, Star, Download, Calendar } from "lucide-react"

import { getUserById, getNivelById, getAsistenciaByAlumnoId, getCalificacionesByAlumnoId, getMaterialesByNivelId } from "@/lib/api"

// Creamos interfaces para tipar nuestros datos

interface Student { id: string; nombre: string; nivel_actual_id?: string; }
interface Nivel { id: string; nombre: string; maestra_id: string; }
interface Maestra { id: string; nombre: string; }
interface Asistencia { date: string; status: string; class: string; }
interface Calificacion { tipo_evaluacion: string; nota: number; comentarios: string; }
interface Material { id: string; nombre: string; tipo_archivo: string; enlace_descarga: string; }
interface DecodedToken {
  id: string;
  nombre: string;
  rol: string;
  // iat: number; // El token también incluye otros campos como este
}


export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Estados para almacenar los datos de la API
  const [student, setStudent] = useState<Student | null>(null);
  const [nivel, setNivel] = useState<Nivel | null>(null);
  const [maestra, setMaestra] = useState<Maestra | null>(null);
  const [asistencia, setAsistencia] = useState<any[]>([]);
  const [calificaciones, setCalificaciones] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);

      try {
        // En una app real, obtendrías el ID del alumno del token JWT guardado en localStorage
        const token = localStorage.getItem('authToken');

        if (!token) {
          console.error("No se encontró el token de autenticación.");
          setIsLoading(false);
          return;
        }

        // 2. Decodificamos el token para obtener la información del usuario
        const decodedToken = jwtDecode<DecodedToken>(token);
        // 3. ¡Usamos el ID del token para hacer las llamadas a la API!
        const studentId = decodedToken.id;

        const studentData = await getUserById(studentId);
        setStudent(studentData);

        if (studentData && studentData.nivel_actual_id) {
          const nivelId = studentData.nivel_actual_id;

          // Hacemos las demás llamadas en paralelo para más eficiencia
          const [nivelData, asistenciaData, calificacionesData, materialesData] = await Promise.all([
            getNivelById(nivelId),
            getAsistenciaByAlumnoId(studentId),
            getCalificacionesByAlumnoId(studentId),
            getMaterialesByNivelId(nivelId)
          ]);

          setNivel(nivelData);
          setAsistencia(asistenciaData);
          setCalificaciones(calificacionesData);
          setMateriales(materialesData);

          // Con los datos del nivel, buscamos el nombre de la maestra
          if (nivelData && nivelData.maestra_id) {
            const maestraData = await getUserById(nivelData.maestra_id);
            setMaestra(maestraData);
          }
        }
      } catch (error) {
        console.error("Error cargando los datos del dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []); // Se ejecuta solo una vez al cargar la página

  // --- Renderizado Condicional ---
  if (isLoading) {
    return <div className="p-8 text-center text-lg font-semibold">Cargando datos del panel...</div>;
  }

  if (!student) {
    return <div className="p-8 text-center text-lg text-red-500">Error: No se pudieron cargar los datos del estudiante.</div>;
  }

  // --- Cálculos para el Resumen (Overview) ---
  const totalAsistencias = asistencia.length;
  const presentes = asistencia.filter(a => a.estado === 'presente').length;
  const porcentajeAsistencia = totalAsistencias > 0 ? Math.round((presentes / totalAsistencias) * 100) : 0;

  const promedioCalificaciones = calificaciones.length > 0
    ? (calificaciones.reduce((sum, c) => sum + c.nota, 0) / calificaciones.length).toFixed(1)
    : "N/A";

  // --- TU CÓDIGO JSX CON DATOS REALES ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-turquoise" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi Panel de Estudiante</h1>
                <p className="text-gray-600">
                  {student.nombre} - {nivel ? nivel.nombre : "Sin nivel asignado"}
                </p>
              </div>
            </div>
            <Button variant="outline">Cerrar Sesión</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-4 md:mb-8 border-b">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            className={activeTab === "overview" ? "border font-bold shadow-md" : ""}
            onClick={() => setActiveTab("overview")}
          >
            Resumen
          </Button>
          <Button
            variant={activeTab === "attendance" ? "default" : "ghost"}
            className={activeTab === "attendance" ? "border font-bold shadow-md" : ""}
            onClick={() => setActiveTab("attendance")}
          >
            Mi Asistencia
          </Button>
          <Button
            variant={activeTab === "materials" ? "default" : "ghost"}
            className={activeTab === "materials" ? "border font-bold shadow-md" : ""}
            onClick={() => setActiveTab("materials")}
          >
            Material de Estudio
          </Button>
          <Button
            variant={activeTab === "grades" ? "default" : "ghost"}
            className={activeTab === "grades" ? "border font-bold shadow-md" : ""}
            onClick={() => setActiveTab("grades")}
          >
            Mis Calificaciones
          </Button>
        </div>


        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Mi Clase</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-violet">{nivel?.nombre || 'N/A'}</div>
                  <Badge variant="outline" className="mt-2">{maestra?.nombre || 'N/A'}</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Asistencia</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-turquoise">{porcentajeAsistencia}%</div>
                  <Progress value={porcentajeAsistencia} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Promedio</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{promedioCalificaciones}</div>
                  <p className="text-sm text-gray-500">sobre 10</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Material</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{materiales.length}</div>
                  <p className="text-sm text-gray-600">Recursos disponibles</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <Card>
            <CardHeader><CardTitle>Mi Historial de Asistencia</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {asistencia.map((record, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <p className="font-medium">{record.fecha}</p>
                  <Badge variant={record.estado === "presente" ? "default" : "destructive"}>{record.estado}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Materials Tab */}
        {activeTab === 'materials' && (
          <Card>
            <CardHeader><CardTitle>Material de Estudio</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {materiales.map((material) => (
                <a key={material.id} href={material.enlace_descarga} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div>
                    <h3 className="font-semibold">{material.nombre}</h3>
                    <Badge variant="outline">{material.tipo_archivo}</Badge>
                  </div>
                  <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Descargar</Button>
                </a>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Grades Tab */}
        {activeTab === 'grades' && (
          <Card>
            <CardHeader><CardTitle>Mis Calificaciones</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {calificaciones.map((calificacion, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{calificacion.tipo_evaluacion}: {calificacion.descripcion}</span>
                    <span className="font-bold text-lg text-blue-600">{calificacion.nota}</span>
                  </div>
                  <p className="text-sm text-gray-600 italic">"{calificacion.comentarios}"</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}