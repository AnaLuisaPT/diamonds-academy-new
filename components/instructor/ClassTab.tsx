"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { listNivelesByInstructor, listAlumnosByNivel, getPromedioAlumno, NivelDTO } from "@/lib/api";
import { useAuth } from "@/app/context/AuthContext";

interface AlumnoWithProm {
  id: string;
  nombre: string;
  email: string;
  promedio: number;
}

export default function ClassTab() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<NivelDTO[]>([]);
  const [selectedClass, setSelectedClass] = useState<NivelDTO | null>(null);
  const [alumnos, setAlumnos] = useState<AlumnoWithProm[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingAlumnos, setLoadingAlumnos] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoadingClasses(true);
    listNivelesByInstructor(user.id)
      .then(setClasses)
      .finally(() => setLoadingClasses(false));
  }, [user]);

  const openClass = async (cls: NivelDTO) => {
    setSelectedClass(cls);
    setLoadingAlumnos(true);
    const raw = await listAlumnosByNivel(cls.id);
    // calcular promedio para cada alumno
    const withProm = await Promise.all(
      raw.map(async (a) => ({
        ...a,
        promedio: await getPromedioAlumno(a.id),
      }))
    );
    setAlumnos(withProm);
    setLoadingAlumnos(false);
  };

  return (
    <div className="space-y-6">
      {loadingClasses
        ? <p>Cargando tus clases…</p>
        : classes.map((cls) => (
            <Card key={cls.id}>
              <CardHeader>
                <CardTitle>{cls.nombre}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div>
                  <p><strong>Horario:</strong> {cls.horario}</p>
                  <p><strong>Edad:</strong> {cls.rango_edad}</p>
                </div>
                <button
                  className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
                  onClick={() => openClass(cls)}
                >
                  Ver Alumnos
                </button>
              </CardContent>
            </Card>
          ))
      }

      {selectedClass && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Alumnos en {selectedClass.nombre}</h2>
          {loadingAlumnos
            ? <p>Cargando alumnos…</p>
            : (
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map((a) => (
                    <tr key={a.id} className="border-t">
                      <td className="px-4 py-2">{a.nombre}</td>
                      <td className="px-4 py-2">{a.email}</td>
                      <td className="px-4 py-2">{a.promedio.toFixed(1)}</td>
                    </tr>
                  ))}
                  {alumnos.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                        No hay alumnos asignados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )
          }
        </div>
      )}
    </div>
  );
}
