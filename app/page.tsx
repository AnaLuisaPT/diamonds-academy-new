import SmartImage from "@/components/smart-image"
import CTAButton from "@/components/cta-button"
import SectionTitle from "@/components/section-title"
import { imageConfig } from "@/lib/image-config"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative gradient-bg-light py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                Danza la Elegancia: Tu Viaje en el Ballet Comienza en
                <span className="gradient-text block mt-2">Diamond&apos;s Academy</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
                Clases de ballet clásico para todas las edades y niveles. Cultiva la gracia, la disciplina y el arte con
                instructores expertos y un ambiente inspirador.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <CTAButton href="/inscripcion" variant="primary">
                  Inscríbete Ahora
                </CTAButton>
                <CTAButton href="/clases" variant="secondary">
                  Ver Clases y Horarios
                </CTAButton>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <div className="relative h-96 lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <SmartImage
                  src={imageConfig.hero.bailarina}
                  alt="Bailarina de ballet en Diamond's Academy"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholderText="Bailarina Principal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Classes Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            title="Nuestras Clases Destacadas"
            subtitle="Descubre la clase perfecta para ti o tu pequeño bailarín"
          />
          {/* GRID RESPONSIVO ACTUALIZADO PARA 5 CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
            {[
              { title: "Baby Ballet", age: "2-4 años", description: "🌟 ¡Sus primeros pasos en la danza! Clases lúdicas que estimulan la coordinación, la creatividad y el amor por el movimiento.", image: imageConfig.clases.babyBallet, placeholder: "Baby Ballet 2-4 años" },
              { title: "Ballet Clásico Infantil", age: "5-7 años", description: "✨ Juego y técnica en equilibrio. Inician la base del ballet clásico a través de dinámicas entretenidas y didácticas.", image: imageConfig.clases.balletInfantil, placeholder: "Ballet Infantil 5-7 años" },
              { title: "Ballet Formativo", age: "8-12 años", description: "💪 Disciplina y expresión. Se desarrollan habilidades técnicas y artísticas en un ambiente de crecimiento y motivación", image: imageConfig.clases.balletFormativo, placeholder: "Ballet Formativo" },
              { title: "Ballet Juvenil", age: "13-17 años", description: "🔥 Pasión y técnica al siguiente nivel. Clases que desafían y perfeccionan, ideales para jóvenes comprometidos con la danza.", image: imageConfig.clases.balletJuvenil, placeholder: "Ballet Juvenil" },
              { title: "Ballet Adulto", age: "18+ años", description: "💃 Nunca es tarde para bailar. Clases para todos los niveles que combinan bienestar, elegancia y una experiencia enriquecedora.", image: imageConfig.clases.balletAdultos, placeholder: "Ballet Adulto" },
            ].map((cls, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-violet/30 group overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden">
                  <SmartImage
                    src={cls.image}
                    alt={cls.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                    placeholderText={cls.placeholder}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800 group-hover:text-violet transition-colors">
                    {cls.title}
                  </h3>
                  <p className="text-violet font-semibold mb-3">{cls.age}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{cls.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <CTAButton href="/clases" variant="secondary">
              Ver Todas las Clases
            </CTAButton>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 md:py-24 gradient-bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative h-96 lg:h-[450px] w-full rounded-2xl overflow-hidden shadow-xl">
                <SmartImage
                  src={imageConfig.nosotros.instalaciones}
                  alt="Instalaciones de Diamond's Academy"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholderText="Nuestras Instalaciones"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Más que una Academia</h2>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                En Diamond&apos;s Academy, creemos que el ballet es más que una danza; es una disciplina que forma
                carácter, fomenta la creatividad y celebra la belleza del movimiento.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Instructores certificados con experiencia internacional",
                  "Instalaciones modernas y equipadas",
                  "Metodología adaptada a cada edad y nivel",
                  "Ambiente de apoyo y excelencia artística",
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-turquoise to-violet mr-4"></div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              <CTAButton href="/nosotros" variant="secondary">
                Conoce Nuestra Historia
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">¿Listo para comenzar tu viaje en el ballet?</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Únete a nuestra academia y descubre la belleza, disciplina y arte del ballet clásico.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <CTAButton href="/contacto" variant="secondary" className="bg-white text-violet hover:bg-gray-100 border-0">
              Contáctanos Hoy
            </CTAButton>
            <CTAButton href="/clases" variant="secondary" className="bg-transparent border-2 border-white hover:bg-white hover:text-violet">
              Ver Horarios
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}