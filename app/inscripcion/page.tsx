import type { Metadata } from "next"
import InscriptionForm from "@/components/inscription-form"
import SectionTitle from "@/components/section-title"

export const metadata: Metadata = {
  title: "Inscripción - Diamond's Academy",
  description: "Inscríbete en nuestras clases de ballet clásico para todas las edades",
}

export default function InscripcionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="gradient-bg-light py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Inscríbete</span> en Diamond's Academy
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Comienza tu viaje en el mundo del ballet clásico. Completa el formulario y nos pondremos en contacto
            contigo.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <InscriptionForm />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle
            title="¿Qué incluye tu inscripción?"
            subtitle="Todo lo que necesitas saber sobre nuestras clases"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: "👩‍🏫",
                title: "Instructores Expertos",
                description: "Profesores certificados con experiencia internacional en ballet clásico",
              },
              {
                icon: "🏢",
                title: "Instalaciones Modernas",
                description: "Estudios equipados con espejos, barras y pisos especializados para danza",
              },
              {
                icon: "👥",
                title: "Grupos Reducidos",
                description: "Clases con pocos estudiantes para atención personalizada",
              },
              {
                icon: "🎭",
                title: "Presentaciones",
                description: "Oportunidades de participar en recitales y presentaciones anuales",
              },
              {
                icon: "📅",
                title: "Horarios Flexibles",
                description: "Múltiples horarios disponibles para adaptarse a tu rutina",
              },
              {
                icon: "🏆",
                title: "Certificaciones",
                description: "Reconocimientos y certificados de progreso en tu formación",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
