"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { registerUser } from "@/lib/api";

interface FormData {
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function AddUserTab() {
  const [formData, setFormData] = useState<FormData>({
    userType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.userType) newErrors.userType = "Selecciona un tipo de usuario";
    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es requerido";
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es requerido";
    if (!formData.email.trim()) newErrors.email = "El correo es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Correo inválido";
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido";
    if (!formData.password) newErrors.password = "La contraseña es requerida";
    else if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirma tu contraseña";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      await toast.promise(
        registerUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
          phone: formData.phone,
        }),
        {
          loading: "Creando usuario...",
          success: () => "Usuario creado con éxito",
          error: (err) => err.message || "Error al crear usuario",
        }
      );
      // Refrescar lista en AdminPage
      router.refresh();
      // Reset form
      setFormData({ userType: "", firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">Agregar Usuario</h2>
      {errors.apiError && <p className="text-red-500">{errors.apiError}</p>}

      <div className="space-y-2">
        <Label>Tipo de Usuario *</Label>
        <Select value={formData.userType} onValueChange={(v) => handleInputChange("userType", v)}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Selecciona un rol" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="alumno">Alumno</SelectItem>
            <SelectItem value="instructor">Instructor</SelectItem>
            <SelectItem value="administrador">Administrador</SelectItem>
          </SelectContent>
        </Select>
        {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Nombre *</Label>
          <Input
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>
        <div>
          <Label>Apellido *</Label>
          <Input
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Email *</Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label>Teléfono *</Label>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Contraseña *</Label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div>
          <Label>Confirmar Contraseña *</Label>
          <Input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full bg-violet-600 text-white hover:bg-violet-700">
        {isLoading ? "Creando..." : "Crear Usuario"}
      </Button>
    </form>
  );
}
