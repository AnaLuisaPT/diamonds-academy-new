"use client";

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  listUsers,
  deleteUser,
  updateUser,
  getUserById,
  listNiveles,
  asignarNivel,
  NivelDTO,
} from "@/lib/api";

interface UserDTO {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  phone?: string;
  nivel_actual_id?: string;
  edad?: string;
  clase?: string;
  experiencia?: string;
  horario?: string;
  apoderado?: string;
  comentarios?: string;
  info_medica?: string;
}

export default function UsersTab() {
  const [allUsers, setAllUsers] = useState<UserDTO[]>([]);
  const [niveles, setNiveles] = useState<NivelDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserDTO>>({});

  // Carga inicial de usuarios y niveles
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [users, lv] = await Promise.all([
          listUsers(),
          listNiveles(),
        ]);
        setAllUsers(users);
        // 2) Guarda el array completo de NivelDTO
        setNiveles(lv);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredUsers = useMemo(() => {
    return allUsers.filter(u => {
      const matchesRole = roleFilter === "all" || u.rol === roleFilter;
      const term = search.trim().toLowerCase();
      return (
        matchesRole &&
        (u.nombre.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term))
      );
    });
  }, [allUsers, search, roleFilter]);

  const fetchUsers = async () => {
    try {
      const data = await listUsers();
      setAllUsers(data);
    } catch (e) {
      console.error(e);
    }
  };

  const openEdit = async (id: string) => {
    setLoading(true);
    try {
      const user = await getUserById(id);
      setSelectedUser(user);
      setFormData(user);
      setIsEditing(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      await updateUser(selectedUser.id, formData);
      await fetchUsers();
      setIsEditing(false);
      setSelectedUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignLevel = async (userId: string, nivelId: string) => {
    setLoading(true);
    try {
      // 2.1 Asignar nivel_actual_id
      await asignarNivel(userId, nivelId);

      // 2.2 Buscar el objeto NivelDTO para obtener su tipo_nivel_id
      const nivel = niveles.find((n) => n.id === nivelId);
      if (nivel) {
        // 2.3 Actualizar el campo "clase" con el tipo_nivel_id
        await updateUser(userId, { clase: nivel.tipo_nivel_id });
      }

      await fetchUsers();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este usuario?")) return;
    setLoading(true);
    try {
      await deleteUser(id);
      setAllUsers(prev => prev.filter(u => u.id !== id));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Input
          placeholder="Buscar por nombre o email"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-white"
        />
        <Select value={roleFilter} onValueChange={v => setRoleFilter(v)}>
          <SelectTrigger className="bg-white w-full sm:w-48">
            <SelectValue placeholder="Filtrar rol" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="alumno">Alumno</SelectItem>
            <SelectItem value="instructor">Instructor</SelectItem>
            <SelectItem value="administrador">Administrador</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* tabla */}
      <div className="overflow-x-auto">
        {loading ? (
          <p>Cargando usuarios…</p>
        ) : (
          <table className="w-full min-w-[600px] table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Rol</th>
                <th className="px-4 py-2 text-left">Clase</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(u => (
                  <tr key={u.id} className="border-t">
                    <td className="px-4 py-2">{u.nombre}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2 capitalize">{u.rol}</td>
                    <td className="px-4 py-2">
                      <Select
                        value={u.nivel_actual_id ?? ""}
                        onValueChange={v => {
                          setLoading(true);
                          asignarNivel(u.id, v)
                            .then(() => fetchUsers())
                            .catch(console.error)
                            .finally(() => setLoading(false));
                        }}
                      >
                        <SelectTrigger className="bg-white w-32">
                          <SelectValue placeholder="Nivel" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {niveles.map((n) => (
                            <SelectItem key={n.id} value={n.id}>
                              {n.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <Button className="bg-violet-600 text-white hover:bg-violet-700" size="sm" onClick={() => openEdit(u.id)}>
                        Editar
                      </Button>
                      <Button
                        className="bg-red-600 text-white hover:bg-red-700"
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(u.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* modal edición */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-white max-w-md mx-auto w-full">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>
              Modifica los campos deseados.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {selectedUser && (
              <>
                <label className="block text-sm font-medium">
                  Nombre
                  <Input
                    className="mt-1 bg-white"
                    value={formData.nombre ?? ""}
                    onChange={e =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                  <Input
                    className="bg-white mt-1"
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono
                  <Input
                    className="bg-white mt-1"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Edad
                  <Input
                    className="bg-white mt-1"
                    value={formData.edad || ''}
                    onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Clase asignada
                  <Select
                    value={formData.nivel_actual_id || ''}
                    onValueChange={(v) => setFormData({ ...formData, nivel_actual_id: v })}
                  >
                    <SelectTrigger className="mt-1 bg-white w-full">
                      <SelectValue placeholder="Selecciona una clase" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {niveles.map(n => (
                        <SelectItem key={n.id} value={n.id}>
                          {n.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Experiencia
                  <Input
                    className="bg-white mt-1"
                    value={formData.experiencia || ''}
                    onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Horario
                  <Input
                    className="bg-white mt-1"
                    value={formData.horario || ''}
                    onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Apoderado
                  <Input
                    className="bg-white mt-1"
                    value={formData.apoderado || ''}
                    onChange={(e) => setFormData({ ...formData, apoderado: e.target.value })}
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Información Médica
                  <Input
                    className="bg-gray-100 mt-1 cursor-not-allowed"
                    value={formData.info_medica || ''}
                    disabled
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Rol
                  <Select
                    value={formData.rol || ''}
                    onValueChange={(v) => setFormData({ ...formData, rol: v })}
                  >
                    <SelectTrigger className="w-full bg-white mt-1">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="alumno">Alumno</SelectItem>
                      <SelectItem value="instructor">Instructor</SelectItem>
                      <SelectItem value="administrador">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </label>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button className="bg-violet-600 text-white hover:bg-violet-700" onClick={handleSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
