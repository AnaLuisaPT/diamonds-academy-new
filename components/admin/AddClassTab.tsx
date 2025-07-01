"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { createNivel } from "@/lib/api";

export default function AddClassTab() {
  const { user } = useAuth();
  const [nombre, setNombre] = useState("");
  const [tipoNivelId, setTipoNivelId] = useState("");
  const [rangoEdad, setRangoEdad] = useState("");
  const [horario, setHorario] = useState("");
  const [cuposMaximos, setCuposMaximos] = useState<number | "">( "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    // validar cupos estrictamente > 0
    if (
      !nombre.trim() ||
      !tipoNivelId ||
      cuposMaximos === "" ||
      cuposMaximos <= 0 ||
      !user?.id
    ) {
      alert("Completa todos los campos obligatorios y asegura cupos > 0.");
      return;
    }
    setLoading(true);
    try {
      await createNivel({
        nombre,
        tipo_nivel_id: tipoNivelId,
        instructor_id: user.id,
        rango_edad: rangoEdad || "N/A",
        horario: horario || "N/A",
        cupos_maximos: cuposMaximos,
      });
      alert("Nivel creado correctamente");
      // limpiar
      setNombre("");
      setTipoNivelId("");
      setRangoEdad("");
      setHorario("");
      setCuposMaximos("");
    } catch (err: any) {
      alert(err.message || "Error creando nivel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold">Crear / Editar Clase</h2>
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <Input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 bg-white"
        />
      </div>
      {/* Tipo */}
      <div>
        <label className="block text-sm font-medium">Tipo de Nivel</label>
        <Select
          value={tipoNivelId}
          onValueChange={setTipoNivelId}
        >
          <SelectTrigger className="mt-1 bg-white">
            <SelectValue placeholder="Selecciona tipo" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="baby-ballet">Baby Ballet</SelectItem>
            <SelectItem value="infantil">Infantil</SelectItem>
            <SelectItem value="formativo">Formativo</SelectItem>
            <SelectItem value="juvenil">Juvenil</SelectItem>
            <SelectItem value="adulto">Adulto</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Rango de edad */}
      <div>
        <label className="block text-sm font-medium">Rango de Edad</label>
        <Select
          value={rangoEdad}
          onValueChange={setRangoEdad}
        >
          <SelectTrigger className="mt-1 bg-white">
            <SelectValue placeholder="Selecciona rango" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="2-4">2–4 años</SelectItem>
            <SelectItem value="5-7">5–7 años</SelectItem>
            <SelectItem value="8-12">8–12 años</SelectItem>
            <SelectItem value="13-17">13–17 años</SelectItem>
            <SelectItem value="18+">18+ años</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Horario */}
      <div>
        <label className="block text-sm font-medium">Horario</label>
        <Select
          value={horario}
          onValueChange={setHorario}
        >
          <SelectTrigger className="mt-1 bg-white">
            <SelectValue placeholder="Selecciona horario" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="matutino">Matutino (9–12)</SelectItem>
            <SelectItem value="diurno">Diurno (14–18)</SelectItem>
            <SelectItem value="vespertino">Vespertino (18–21)</SelectItem>
            <SelectItem value="sabados">Sábados</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Cupos máximos */}
      <div>
        <label className="block text-sm font-medium">Cupos Máximos</label>
        <Input
          type="number"
          min={1}
          step={1}
          value={cuposMaximos}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            setCuposMaximos(!isNaN(v) && v > 0 ? v : "");
          }}
          className="mt-1 bg-white"
        />
      </div>
      <Button className="bg-violet-600 text-white hover:bg-violet-700"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar Clase"}
      </Button>
    </div>
  );
}
