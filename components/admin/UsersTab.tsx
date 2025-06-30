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
import { listUsers, deleteUser, updateUser, getUserById } from "@/lib/api";

interface UserDTO {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  phone?: string;
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
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserDTO>>({});

  useEffect(() => {
    setLoading(true);
    listUsers()
      .then((data) => setAllUsers(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = useMemo(() => {
    return allUsers.filter((u) => {
      const matchesRole = roleFilter === "all" || u.rol === roleFilter;
      const term = search.trim().toLowerCase();
      const matchesSearch =
        u.nombre.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term);
      return matchesRole && matchesSearch;
    });
  }, [allUsers, search, roleFilter]);

  const openEdit = async (id: string) => {
    setLoading(true);
    try {
      const user = await getUserById(id);
      setSelectedUser(user);
      setFormData(user);
      setIsEditing(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users and update state
  const fetchUsers = async () => {
    try {
      const data = await listUsers();
      setAllUsers(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      // PUT to users table
      await updateUser(selectedUser.id, formData);
      await fetchUsers();
      setIsEditing(false);
      setSelectedUser(null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Eliminar este usuario?")) {
      setLoading(true);
      try {
        await deleteUser(id);
        setAllUsers((prev) => prev.filter((u) => u.id !== id));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Input
          className="bg-white flex-1"
          placeholder="Buscar por nombre o email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={roleFilter}
          onValueChange={(v) => setRoleFilter(v)}
        >
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

      {/* Tabla responsiva */}
      <div className="overflow-x-auto">
        {loading ? (
          <p>Cargando usuarios...</p>
        ) : (
          <table className="w-full min-w-[600px] table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Rol</th>
                <th className="px-4 py-2 text-left">Teléfono</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="border-t">
                    <td className="px-4 py-2">{u.nombre}</td>
                    <td className="px-4 py-2 break-words">{u.email}</td>
                    <td className="px-4 py-2 capitalize">{u.rol}</td>
                    <td className="px-4 py-2">{u.phone || '-'}</td>
                    <td className="px-4 py-2 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        className="transition shadow-sm hover:shadow-md hover:bg-gray-100"
                        onClick={() => openEdit(u.id)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={() => handleDelete(u.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Edición */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-white max-w-md mx-auto w-full">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>Modifica los campos deseados.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {selectedUser && (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                  <Input
                    className="bg-white mt-1"
                    value={formData.nombre || ''}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
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
                  Clase
                  <Input
                    className="bg-white mt-1"
                    value={formData.clase || ''}
                    onChange={(e) => setFormData({ ...formData, clase: e.target.value })}
                  />
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
            <Button onClick={handleSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
