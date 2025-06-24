import type { Metadata } from "next"
import InscriptionForm from "@/components/inscription-form"
import SectionTitle from "@/components/section-title"
import type { FC } from "react"

export const metadata: Metadata = {
  title: "Inscripción - Diamond's Academy",
  description: "Inscríbete en nuestras clases de ballet clásico para todas las edades",
};

const includedItems = [
    { icon: "👩‍🏫", title: "Instructores Expertos", description: "Profesores certificados con experiencia." },
    { icon: "🏢", title: "Instalaciones Modernas", description: "Estudios equipados para la danza." },
    { icon: "👥", title: "Grupos Reducidos", description: "Atención personalizada y de calidad." },
];

const InfoCard: FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="text-center p-6 bg-white rounded-xl border border-transparent hover:border-violet-200 hover:shadow-lg transition-all duration-300">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

export default function InscripcionPage() {
  return (
    <div className="bg-gray-50">
      <section className="gradient-bg-light py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Inscríbete</span> en Diamond's Academy
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Completa el formulario y nos pondremos en contacto contigo.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <InscriptionForm />
          </div>
        </div>
      </section>
    </div>
  )
}