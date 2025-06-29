"use client";

import { useState } from "react";
import { submitInscription } from "@/app/actions/inscription";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { toast } from "sonner";

interface FormData {
  studentName: string;
  studentAge: string;
  parentName: string;
  email: string;
  phone: string;
  classType: string;
  experience: string;
  schedule: string;
  medicalInfo: string;
  comments: string;
}

const initialFormData: FormData = {
  studentName: "",
  studentAge: "",
  parentName: "",
  email: "",
  phone: "",
  classType: "",
  experience: "",
  schedule: "",
  medicalInfo: "",
  comments: "",
};

export default function InscriptionForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSelectChange = (name: keyof FormData, value: string) =>
    setFormData({ ...formData, [name]: value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.promise(submitInscription(formData), {
      loading: "Enviando inscripción...",
      success: () => {
        setSubmitted(true);
        return "Inscripción enviada con éxito.";
      },
      error: () => "Error al enviar la inscripción.",
    });
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-6">✨</div>
        <h2 className="text-3xl font-bold mb-4 gradient-text">
          ¡Inscripción Enviada!
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Gracias por tu interés en Diamond's Academy. Nos pondremos en contacto
          contigo dentro de las próximas 24 horas para confirmar los detalles.
        </p>
        <Button asChild size="lg">
          <Link href="/">Volver al Inicio</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Información del Estudiante */}
      <fieldset className="space-y-6 border-l-4 border-violet-200 pl-6">
        <legend className="text-xl font-semibold text-gray-800">
          Información del Estudiante
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="studentName">Nombre Completo *</Label>
            <Input
              id="studentName"
              name="studentName"
              required
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Nombre completo"
            />
          </div>
          <div>
            <Label htmlFor="studentAge">Edad *</Label>
            <Select
              name="studentAge"
              required
              value={formData.studentAge}
              onValueChange={(v) => handleSelectChange("studentAge", v)}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecciona la edad" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="2-4">2-4 años</SelectItem>
                <SelectItem value="5-7">5-7 años</SelectItem>
                <SelectItem value="8-12">8-12 años</SelectItem>
                <SelectItem value="13-17">13-17 años</SelectItem>
                <SelectItem value="18+">18+ años</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </fieldset>

      {/* Información de Contacto */}
      <fieldset className="space-y-6 border-l-4 border-violet-200 pl-6">
        <legend className="text-xl font-semibold text-gray-800">
          Información de Contacto
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="parentName">Padre/Madre/Tutor</Label>
            <Input
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              placeholder="Solo si el estudiante es menor"
            />
          </div>
          <div>
            <Label htmlFor="email">Correo Electrónico *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="phone">Teléfono *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+56 9 1234 5678"
          />
        </div>
      </fieldset>

      {/* Información de la Clase */}
      <fieldset className="space-y-6 border-l-4 border-violet-200 pl-6">
        <legend className="text-xl font-semibold text-gray-800">
          Información de la Clase
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="classType">Tipo de Clase *</Label>
            <Select
              name="classType"
              required
              value={formData.classType}
              onValueChange={(v) => handleSelectChange("classType", v)}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecciona una clase" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="baby-ballet">
                  Baby Ballet (2-4 años)
                </SelectItem>
                <SelectItem value="ballet-infantil">
                  Ballet Clásico Infantil (5-7)
                </SelectItem>
                <SelectItem value="ballet-formativo">
                  Ballet Formativo (8-12)
                </SelectItem>
                <SelectItem value="ballet-juvenil">
                  Ballet Juvenil (13-17)
                </SelectItem>
                <SelectItem value="ballet-adulto">
                  Ballet Adulto (18+)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="experience">Experiencia Previa *</Label>
            <Select
              name="experience"
              required
              value={formData.experience}
              onValueChange={(v) => handleSelectChange("experience", v)}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecciona tu nivel" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="principiante">
                  Principiante (Sin experiencia)
                </SelectItem>
                <SelectItem value="basico">
                  Básico (Menos de 1 año)
                </SelectItem>
                <SelectItem value="intermedio">
                  Intermedio (1-3 años)
                </SelectItem>
                <SelectItem value="avanzado">
                  Avanzado (Más de 3 años)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="schedule">Preferencia de Horario *</Label>
          <Select
            name="schedule"
            required
            value={formData.schedule}
            onValueChange={(v) => handleSelectChange("schedule", v)}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Selecciona tu preferencia" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="matutino">Matutino (9am - 12pm)</SelectItem>
              <SelectItem value="vespertino">Vespertino (2pm - 6pm)</SelectItem>
              <SelectItem value="nocturno">Nocturno (6pm - 9pm)</SelectItem>
              <SelectItem value="sabados">Sábados</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </fieldset>

      {/* Información Adicional */}
      <fieldset className="space-y-6 border-l-4 border-violet-200 pl-6">
        <legend className="text-xl font-semibold text-gray-800">
          Información Adicional
        </legend>
        <div>
          <Label htmlFor="medicalInfo">Información Médica Relevante</Label>
          <Textarea
            id="medicalInfo"
            name="medicalInfo"
            value={formData.medicalInfo}
            onChange={handleChange}
            placeholder="Lesiones, alergias, condiciones médicas, etc."
          />
        </div>
        <div>
          <Label htmlFor="comments">Comentarios o Preguntas</Label>
          <Textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="¿Hay algo más que te gustaría que sepamos?"
          />
        </div>
      </fieldset>

      {/* Botón de Envío */}
      <div className="text-center pt-6">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar Inscripción"}
        </Button>
        <p className="text-sm text-gray-500 mt-4">* Campos obligatorios.</p>
      </div>
    </form>
  );
}