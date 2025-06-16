import Image from "next/image"
import SectionTitle from "@/components/section-title"
import { imageConfig } from "@/lib/image-config"

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-turquoise/30 via-white to-magenta/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Diamond&apos;s Academy</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            Conoce nuestra historia, filosofía y el equipo detrás de nuestra academia de ballet
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <SectionTitle title="Nuestra Pasión por el Ballet" centered={false} />
              <div className="space-y-4 text-gray-700">
                <p>
                  En Diamond&apos;s Academy, creemos que el ballet es más que una danza; es una disciplina que forma
                  carácter, fomenta la creatividad y celebra la belleza del movimiento. Desde 2023, nos hemos dedicado a
                  nutrir el talento y la pasión por el ballet en un ambiente de apoyo y excelencia.
                </p>
                <p>
                  Nuestra filosofía se centra en una enseñanza rigurosa pero inspiradora, adaptada a cada etapa de
                  desarrollo del bailarín. Fomentamos el respeto, la autodisciplina y el amor por el arte.
                </p>
                <p>
                  Cada estudiante recibe atención personalizada y es guiado a través de un programa estructurado que
                  desarrolla tanto habilidades técnicas como artísticas. Creemos en el potencial de cada bailarín y
                  trabajamos para ayudarles a alcanzar sus metas, ya sea que aspiren a una carrera profesional o
                  simplemente disfruten de los beneficios del ballet como actividad recreativa.
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={imageConfig.nosotros.instalaciones}
                  alt="Interior de Diamond's Academy"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gradient-to-r from-violet/10 via-white to-turquoise/10">
        <div className="container mx-auto px-4">
          <SectionTitle title="Nuestros Valores" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Excelencia",
                description:
                  "Buscamos la excelencia en cada aspecto de nuestra enseñanza, desde la técnica hasta la expresión artística.",
              },
              {
                title: "Disciplina",
                description:
                  "Fomentamos la autodisciplina como herramienta fundamental para el crecimiento personal y artístico.",
              },
              {
                title: "Creatividad",
                description:
                  "Estimulamos la expresión creativa y la interpretación personal dentro del marco de la técnica clásica.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-turquoise to-violet bg-clip-text text-transparent">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle title="Nuestra Historia" />

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-turquoise to-violet flex items-center justify-center text-white font-bold text-xl">
                    2023
                  </div>
                  <div className="h-full w-0.5 bg-gradient-to-b from-turquoise to-violet mt-4 md:block hidden"></div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Fundación</h3>
                  <p className="text-gray-700">
                    Diamond&apos;s Academy fue fundada por Ana Luisa con la visión de crear un espacio donde bailarines
                    de todas las edades pudieran desarrollar su pasión por el ballet en un ambiente profesional pero
                    acogedor.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-turquoise to-violet flex items-center justify-center text-white font-bold text-xl">
                    20XX
                  </div>
                  <div className="h-full w-0.5 bg-gradient-to-b from-turquoise to-violet mt-4 md:block hidden"></div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Expansión</h3>
                  <p className="text-gray-700">
                    Tras el éxito inicial, ampliamos nuestras instalaciones y programa de estudios para incluir más
                    niveles y estilos, manteniendo siempre la excelencia en la enseñanza del ballet clásico.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-turquoise to-violet flex items-center justify-center text-white font-bold text-xl">
                    Hoy
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Actualidad</h3>
                  <p className="text-gray-700">
                    Hoy, Diamond&apos;s Academy es reconocida como una de las principales academias de ballet de la
                    región, con estudiantes que han continuado sus estudios en prestigiosas compañías y conservatorios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
