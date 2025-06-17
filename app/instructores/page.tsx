import Image from "next/image"
import SectionTitle from "@/components/section-title"
import { imageConfig } from "@/lib/image-config"

export default function InstructorsPage() {
  const instructors = [
    {
      name: "Ana Flores",
      title: "Directora y Maestra Principal",
      bio: "Bailarina con más de 20 años de experiencia, graduada del Conservatorio Nacional de Danza. Su pasión es transmitir la belleza y disciplina del ballet clásico. Ana ha bailado como solista en varias compañías nacionales e internacionales antes de dedicarse a la enseñanza. Su enfoque pedagógico combina la técnica rigurosa con un ambiente de apoyo que permite a cada estudiante alcanzar su máximo potencial.",
      image: imageConfig.instructores.anaFlores,
      specialties: ["Ballet Clásico", "Repertorio", "Metodología Vaganova"],
    },
    {
      name: "Carlos Ruiz",
      title: "Maestro de Ballet y Preparación Física",
      bio: "Ex-bailarín solista de la Compañía Nacional de Danza. Especializado en técnica masculina y acondicionamiento físico para bailarines. Carlos aporta una perspectiva única a la enseñanza del ballet, con énfasis en la fuerza, el atletismo y la expresividad. Su formación incluye estudios en biomecánica y prevención de lesiones, conocimientos que integra en sus clases para asegurar un desarrollo técnico seguro y efectivo.",
      image: imageConfig.instructores.carlosRuiz,
      specialties: ["Técnica Masculina", "Acondicionamiento Físico", "Pas de Deux"],
    },
    {
      name: "Elena Martínez",
      title: "Maestra de Ballet Infantil",
      bio: "Especialista en pedagogía de la danza para niños, Elena tiene un don especial para conectar con los más pequeños y despertar en ellos el amor por el ballet. Con formación en psicología infantil y danza educativa, ha desarrollado un método que combina el juego con el aprendizaje técnico, creando un ambiente donde los niños florecen artística y personalmente.",
      image: imageConfig.instructores.elenaMartinez,
      specialties: ["Ballet Infantil", "Danza Creativa", "Desarrollo Motor"],
    },
    {
      name: "Roberto Sánchez",
      title: "Maestro de Ballet Contemporáneo",
      bio: "Con una sólida formación en ballet clásico y danza contemporánea, Roberto aporta una perspectiva fresca y moderna a nuestra academia. Su experiencia como coreógrafo y bailarín en producciones internacionales enriquece sus clases, donde combina la técnica clásica con elementos contemporáneos para crear un estilo único y expresivo.",
      image: imageConfig.instructores.robertoSanchez,
      specialties: ["Ballet Contemporáneo", "Improvisación", "Composición Coreográfica"],
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-turquoise/30 via-white to-magenta/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestros Instructores</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">Expertos que Inspiran y Guían</p>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Conoce a Nuestro Equipo"
            subtitle="Profesionales apasionados dedicados a cultivar el talento y la pasión por el ballet"
          />

          <div className="space-y-24">
            {instructors.map((instructor, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center`}
              >
                <div className="md:w-1/3">
                  <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src={instructor.image || "/placeholder.svg"}
                      alt={instructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-turquoise to-violet bg-clip-text text-gray">
                    {instructor.name}
                  </h3>
                  <p className="text-violet font-medium mb-6">{instructor.title}</p>

                  <div className="space-y-4 text-gray-700 mb-6">
                    <p>{instructor.bio}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Especialidades:</h4>
                    <div className="flex flex-wrap gap-2">
                      {instructor.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-gradient-to-r from-turquoise/20 to-violet/20 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 bg-gradient-to-r from-violet/10 via-white to-turquoise/10">
        <div className="container mx-auto px-4">
          <SectionTitle 
          title="Nuestra Filosofía de Enseñanza" 
          subtitle=""/>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-lg mb-6 text-gray-700">
                En Diamond&apos;s Academy, creemos que cada estudiante es único, con su propio ritmo de aprendizaje y
                potencial artístico. Nuestra filosofía de enseñanza se basa en:
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Atención Personalizada",
                    description:
                      "Nuestras clases mantienen un número limitado de estudiantes para garantizar que cada uno reciba la atención que merece.",
                  },
                  {
                    title: "Técnica Sólida",
                    description:
                      "Creemos que una base técnica sólida es fundamental para el desarrollo artístico y la prevención de lesiones.",
                  },
                  {
                    title: "Expresión Artística",
                    description:
                      "Más allá de la técnica, fomentamos la expresividad y la conexión emocional con la danza.",
                  },
                  {
                    title: "Ambiente Positivo",
                    description:
                      "Cultivamos un entorno de respeto, apoyo y motivación donde cada estudiante se sienta valorado.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-turquoise to-violet flex items-center justify-center text-white font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
