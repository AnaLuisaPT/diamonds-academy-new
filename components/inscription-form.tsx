"use client"

import type React from "react"
import { useState } from "react"
import { submitInscription } from "@/app/actions/inscription"
import CTAButton from "@/components/cta-button"

interface FormData {
  studentName: string
  studentAge: string
  parentName: string
  email: string
  phone: string
  classType: string
  experience: string
  schedule: string
  medicalInfo: string
  comments: string
}

export default function InscriptionForm() {
  const [formData, setFormData] = useState<FormData>({
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
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitInscription(formData)
      setSubmitted(true)
    } catch (error) {
      console.error("Error al enviar inscripción:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-6">✨</div>
        <h2 className="text-3xl font-bold mb-4 gradient-text">¡Inscripción Enviada!</h2>
        <p className="text-lg text-gray-700 mb-8">
          Gracias por tu interés en Diamond's Academy. Nos pondremos en contacto contigo dentro de las próximas 24
          horas.
        </p>
        <CTAButton href="/" variant="primary">
          Volver al Inicio
        </CTAButton>
      </div>
    )
  }

  return (
    <div className="inscription-form">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Formulario de Inscripción</h2>
          <p className="text-gray-600">Completa todos los campos para procesar tu inscripción</p>
        </div>

        {/* Información del Estudiante */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold section-title">Información del Estudiante</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="studentName" className="form-label">
                Nombre Completo del Estudiante *
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                required
                value={formData.studentName}
                onChange={handleChange}
                className="form-input"
                placeholder="Nombre completo"
              />
            </div>

            <div>
              <label htmlFor="studentAge" className="form-label">
                Edad *
              </label>
              <select
                id="studentAge"
                name="studentAge"
                required
                value={formData.studentAge}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Selecciona la edad</option>
                <option value="2-4">2-4 años</option>
                <option value="5-7">5-7 años</option>
                <option value="8-12">8-12 años</option>
                <option value="13-17">13-17 años</option>
                <option value="18+">18+ años</option>
              </select>
            </div>
          </div>
        </div>

        {/* Información del Contacto */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold section-title">Información de Contacto</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="parentName" className="form-label">
                Nombre del Padre/Madre/Tutor
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="form-input"
                placeholder="Solo si el estudiante es menor de edad"
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Correo Electrónico *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="form-label">
              Teléfono *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="+56 9 1234 5678"
            />
          </div>
        </div>

        {/* Información de la Clase */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold section-title">Información de la Clase</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="classType" className="form-label">
                Tipo de Clase *
              </label>
              <select
                id="classType"
                name="classType"
                required
                value={formData.classType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Selecciona una clase</option>
                <option value="baby-ballet">Baby Ballet (2-4 años)</option>
                <option value="ballet-infantil">Ballet Clásico Infantil (5-7 años)</option>
                <option value="ballet-formativo">Ballet Formativo (8-12 años)</option>
                <option value="ballet-juvenil">Ballet Juvenil (13-17 años)</option>
                <option value="ballet-adulto">Ballet Adulto (18+ años)</option>
              </select>
            </div>

            <div>
              <label htmlFor="experience" className="form-label">
                Experiencia Previa *
              </label>
              <select
                id="experience"
                name="experience"
                required
                value={formData.experience}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Selecciona tu nivel</option>
                <option value="principiante">Principiante (Sin experiencia)</option>
                <option value="basico">Básico (Menos de 1 año)</option>
                <option value="intermedio">Intermedio (1-3 años)</option>
                <option value="avanzado">Avanzado (Más de 3 años)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="schedule" className="form-label">
              Preferencia de Horario *
            </label>
            <select
              id="schedule"
              name="schedule"
              required
              value={formData.schedule}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Selecciona tu preferencia</option>
              <option value="matutino">Matutino (9:00 AM - 12:00 PM)</option>
              <option value="vespertino">Vespertino (2:00 PM - 6:00 PM)</option>
              <option value="nocturno">Nocturno (6:00 PM - 9:00 PM)</option>
              <option value="sabados">Sábados</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>

        {/* Información Adicional */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold section-title">Información Adicional</h3>

          <div>
            <label htmlFor="medicalInfo" className="form-label">
              Información Médica Relevante
            </label>
            <textarea
              id="medicalInfo"
              name="medicalInfo"
              rows={3}
              value={formData.medicalInfo}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Lesiones, condiciones médicas, alergias, etc."
            />
          </div>

          <div>
            <label htmlFor="comments" className="form-label">
              Comentarios o Preguntas
            </label>
            <textarea
              id="comments"
              name="comments"
              rows={4}
              value={formData.comments}
              onChange={handleChange}
              className="form-textarea"
              placeholder="¿Hay algo más que te gustaría que sepamos?"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting ? (
              <>
                <svg
                  className="spinner -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enviando...
              </>
            ) : (
              "Enviar Inscripción"
            )}
          </button>
          <p className="text-sm text-gray-500 mt-4">
            * Campos obligatorios. Nos pondremos en contacto contigo dentro de 24 horas.
          </p>
        </div>
      </form>
    </div>
  )
}
