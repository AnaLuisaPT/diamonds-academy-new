import SectionTitle from "@/components/section-title"
import CTAButton from "@/components/cta-button"
import Image from "next/image"
import { imageConfig } from "@/lib/image-config"

export default function ClassesPage() {
  const classes = [
    {
      title: "Baby Ballet",
      age: "2-4 años",
      description:
        "Introducción lúdica al ballet, desarrollando coordinación, musicalidad y amor por la danza. Las clases incluyen juegos creativos, historias y movimientos básicos que preparan a los pequeños para el estudio formal del ballet.",
      schedule: ["Lunes y Miércoles: 16:00 - 16:45", "Sábados: 10:00 - 10:45"],
      image: imageConfig.clases.babyBallet,
    },
    {
      title: "Ballet Infantil",
      age: "5-7 años",
      description:
        "Fundamentos del ballet, técnica básica, postura, disciplina y desarrollo de la gracia. Los estudiantes aprenden la terminología del ballet, posiciones básicas y secuencias simples, desarrollando fuerza, flexibilidad y musicalidad.",
      schedule: ["Martes y Jueves: 16:00 - 17:15", "Sábados: 11:00 - 12:15"],
      image: imageConfig.clases.preBallet,
    },
    {
      title: "Ballet Formativo",
      age: "8-12 años",
      description:
        "Desarrollo técnico profundo, trabajo de puntas, repertorio y expresión artística. Las clases incluyen barra, centro, adagio, giros, saltos y variaciones del repertorio clásico adaptadas al nivel.",
      schedule: ["Lunes, Miércoles y Viernes: 17:30 - 19:00", "Sábados: 12:30 - 14:00"],
      image: imageConfig.clases.balletFormativo,
    },
    {
      title: "Ballet Juvenil",
      age: "13-17 años",
      description:
        "Clases adaptadas para adultos de todos los niveles, desde principiantes absolutos hasta bailarines con experiencia. Enfoque en técnica, postura, flexibilidad y expresión artística en un ambiente acogedor.",
      schedule: ["Martes y Jueves: 19:30 - 21:00", "Sábados: 14:30 - 16:00"],
      image: imageConfig.clases.balletJuvenil,
    },
    {
      title: "Ballet Adultos",
      age: "18+ años",
      description:
        "Dominio del trabajo de puntas con énfasis en la seguridad, fuerza y técnica impecable. Requisito: mínimo 2 años de experiencia en ballet y aprobación del instructor.",
      schedule: ["Miércoles: 19:15 - 20:30", "Viernes: 19:15 - 20:30"],
      image: imageConfig.clases.balletAdultos,
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-turquoise/30 via-white to-magenta/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestras Clases</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">Encuentra Tu Nivel, Descubre Tu Potencial</p>
        </div>
      </section>

      {/* Classes Overview */}
      <section className="py-18 bg-white">
        <div className="container mx-auto px-10 ">
          <SectionTitle
            title="Programa de Clases"
            subtitle="Ofrecemos una amplia gama de clases para satisfacer las necesidades de cada estudiante."
          />

          <div className="space-y-16">
            {classes.map((cls, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
              >
                <div className="md:w-1/3">
                  <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
                    <Image src={cls.image || "/placeholder.svg"} alt={cls.title} fill className="object-cover" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-turquoise to-violet bg-clip-text text-gray">
                    {cls.title}
                  </h3>
                  <p className="text-violet font-medium mb-4">{cls.age}</p>
                  <p className="text-gray-700 mb-6">{cls.description}</p>

                  <div className="bg-gradient-to-r from-turquoise/10 to-violet/10 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-2">Horarios:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {cls.schedule.map((time, idx) => (
                        <li key={idx} className="text-gray-700">
                          {time}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gradient-to-r from-violet/10 via-white to-turquoise/10">
        <div className="container mx-auto px-4">
          <SectionTitle 
          title="Precios y Planes" 
          subtitle=""/>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Plan Básico",
                price: "$30.000",
                frequency: "mensual",
                features: ["1 clase por semana", "Acceso a eventos especiales", "Evaluación trimestral"],
              },
              {
                name: "Plan Intermedio",
                price: "$50.000",
                frequency: "mensual",
                features: [
                  "2 clases por semana",
                  "Acceso a eventos especiales",
                  "Evaluación trimestral",
                  "Descuento en talleres",
                ],
                highlighted: true,
              },
              {
                name: "Plan Avanzado",
                price: "$65.000",
                frequency: "mensual",
                features: [
                  "3 o más clases por semana",
                  "Acceso a eventos especiales",
                  "Evaluación trimestral",
                  "Descuento en talleres",
                  "Clases privadas con descuento",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden ${plan.highlighted
                    ? "bg-gradient-to-br from-turquoise to-violet text-gray shadow-xl transform scale-105"
                    : "text-gray bg-white shadow-lg "
                  }`}
              >
                <div className="p-8">
                  <h3
                    className={`text-2xl font-bold mb-2 ${plan.highlighted
                        ? "text-black"
                        : "bg-gradient-to-r from-turquoise to-violet bg-clip-text text-gray"
                      }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex text-gray items-end mb-6">
                    <span className="text-3xl text-gray font-bold">{plan.price}</span>
                    <span className="ml-1 text-sm text-gray opacity-80">/{plan.frequency}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <i className="fas fa-check mr-2 text-sm"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <CTAButton
                    href="/inscripcion"
                    variant={plan.highlighted ? "secondary" : "primary"}
                    className={`w-full ${plan.highlighted ? "bg-white text-violet hover:bg-white/90" : ""}`}
                  >
                    Inscríbete
                  </CTAButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Preguntas Frecuentes"
            subtitle="Resolvemos las dudas más comunes sobre nuestras clases de ballet"
          />

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "¿Qué debe llevar mi hijo/a a su primera clase?",
                answer:
                  "Para la primera clase, recomendamos ropa cómoda que permita moverse libremente. Después de la primera clase, se proporcionará información sobre el uniforme específico requerido para cada nivel.",
              },
              {
                question: "¿Necesito experiencia previa para unirme a las clases de adultos?",
                answer:
                  "No, nuestras clases de adultos están diseñadas para todos los niveles, incluyendo principiantes absolutos. Nuestros instructores adaptan las clases para asegurar que cada estudiante progrese a su propio ritmo.",
              },
              {
                question: "¿Cuándo puedo comenzar las clases de puntas?",
                answer:
                  "El trabajo de puntas generalmente comienza después de al menos 2-3 años de entrenamiento consistente en ballet, y solo cuando el instructor determina que el estudiante tiene la fuerza, técnica y madurez física necesarias.",
              },
              {
                question: "¿Realizan presentaciones o recitales?",
                answer:
                  "Sí, organizamos un recital anual donde todos los estudiantes tienen la oportunidad de mostrar lo aprendido. También participamos en eventos especiales y competencias a lo largo del año.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gradient-to-r from-turquoise/5 to-violet/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-turquoise to-violet text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para comenzar tu viaje en el ballet?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Inscríbete hoy y da el primer paso hacia una experiencia transformadora.
          </p>
          <CTAButton href="/inscripcion" variant="secondary" className="bg-white text-violet hover:bg-white/90">
            Inscríbete Ahora
          </CTAButton>
        </div>
      </section>
    </div>
  )
}
