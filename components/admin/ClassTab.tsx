"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  listNiveles,
  deleteNivel,
  updateNivel,
  listAlumnosByNivel,
  asignarNivel,          // <-- Importa asignarNivel
  NivelDTO,
  UserDTO,
} from "@/lib/api";

export default function ClassTab() {
  const [classes, setClasses] = useState<NivelDTO[]>([]);
  const [loading, setLoading] = useState(false);

  // modales y contexto
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState<NivelDTO | null>(null);

  // alumnos de la clase seleccionada
  const [alumnos, setAlumnos] = useState<UserDTO[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  // campos editar
  const [nombre, setNombre] = useState("");
  const [rangoEdad, setRangoEdad] = useState("");
  const [horario, setHorario] = useState("");
  const [cuposMaximos, setCuposMaximos] = useState(0);
  const [saving, setSaving] = useState(false);

  // --- Refrescadores ---
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const cls = await listNiveles();
      setClasses(cls);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshStudents = useCallback(async (nivelId: string) => {
    setStudentsLoading(true);
    try {
      const list = await listAlumnosByNivel(nivelId);
      setAlumnos(list);
    } catch (e) {
      console.error(e);
    } finally {
      setStudentsLoading(false);
    }
  }, []);

  // carga inicial
  useEffect(() => {
    refresh();
  }, [refresh]);

  // --- Handlers CRUD ---
  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta clase?")) return;
    setLoading(true);
    try {
      await deleteNivel(id);
      await refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (cls: NivelDTO) => {
    setCurrentClass(cls);
    setNombre(cls.nombre);
    setRangoEdad(cls.rango_edad);
    setHorario(cls.horario);
    setCuposMaximos(cls.cupos_maximos);
    setEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!currentClass) return;
    setSaving(true);
    try {
      await updateNivel(currentClass.id, {
        nombre,
        rango_edad: rangoEdad,
        horario,
        cupos_maximos: cuposMaximos,
      });
      setEditModalOpen(false);
      await refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const openView = async (cls: NivelDTO) => {
    setCurrentClass(cls);
    setViewModalOpen(true);
    await refreshStudents(cls.id);
  };

  const handleRemoveStudent = async (u: UserDTO) => {
    if (!currentClass) return;
    if (
      !confirm(`¿Eliminar a ${u.nombre} de ${currentClass.nombre}?`)
    )
      return;

    // 1) Quitar nivel al usuario (sin borrar al usuario)
    await asignarNivel(u.id, "");

    // 2) Decrementar cupos en la clase
    await updateNivel(currentClass.id, {
      cupos_actuales: currentClass.cupos_actuales - 1,
    });

    // 3) Refrescar alumnos y clases
    await refreshStudents(currentClass.id);
    await refresh();
  };

  // --- Render ---
  return (
    <div className="space-y-4">
      {loading && <p>Cargando clases…</p>}
      {!loading &&
        classes.map((cls) => {
          const disponibles =
            cls.cupos_maximos - cls.cupos_actuales;
          return (
            <Card key={cls.id}>
              <CardHeader>
                <CardTitle>{cls.nombre}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Tipo:</strong> {cls.tipo_nivel_id}
                </p>
                <p>
                  <strong>Edad:</strong> {cls.rango_edad}
                </p>
                <p>
                  <strong>Horario:</strong> {cls.horario}
                </p>
                <p>
                  <strong>
                    Cupos:
                  </strong>{" "}
                  {cls.cupos_actuales}/{cls.cupos_maximos}
                </p>
                <p>
                  <strong>Disponibles:</strong> {disponibles}
                </p>
              </CardContent>
              <div className="p-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-violet-600 text-white hover:bg-violet-700"
                  onClick={() => openEdit(cls)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => handleDelete(cls.id)}
                >
                  Eliminar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-violet-600 text-white hover:bg-violet-700"
                  onClick={() => openView(cls)}
                >
                  Ver Alumnos
                </Button>
              </div>
            </Card>
          );
        })}

      {/* Modal Editar */}
      <Dialog
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
      >
        <DialogContent className="bg-white max-w-md mx-auto w-full">
          <DialogHeader>
            <DialogTitle>Editar Clase</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {/* Nombre */}
            <label className="block text-sm font-medium">
              Nombre
              <Input
                className="bg-white mt-1"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>
            {/* Rango Edad */}
            <label className="block text-sm font-medium">
              Rango de Edad
              <Input
                className="bg-white mt-1"
                value={rangoEdad}
                onChange={(e) => setRangoEdad(e.target.value)}
              />
            </label>
            {/* Horario */}
            <label className="block text-sm font-medium">
              Horario
              <Input
                className="bg-white mt-1"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
              />
            </label>
            {/* Cupos Máximos */}
            <label className="block text-sm font-medium">
              Cupos Máximos
              <Input
                type="number"
                min={0}
                className="bg-white mt-1"
                value={cuposMaximos}
                onChange={(e) =>
                  setCuposMaximos(
                    parseInt(e.target.value, 10) || 0
                  )
                }
              />
            </label>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Ver Alumnos */}
      <Dialog
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
      >
        <DialogContent className="bg-white max-w-md mx-auto w-full">
          <DialogHeader>
            <DialogTitle>
              Alumnos en {currentClass?.nombre}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-4 max-h-80 overflow-y-auto">
            {studentsLoading && <p>Cargando alumnos…</p>}
            {!studentsLoading &&
              alumnos.map((u) => (
                <div
                  key={u.id}
                  className="p-2 border-b flex justify-between items-center"
                >
                  <span>
                    {u.nombre} — {u.email}
                  </span>
                  <Button
                    className="bg-red-600 text-white hover:bg-red-700"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemoveStudent(u)}
                  >
                    Eliminar alumno
                  </Button>
                </div>
              ))}
            {!studentsLoading && alumnos.length === 0 && (
              <p className="text-center py-4">
                No hay alumnos asignados.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewModalOpen(false)}
            >
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
