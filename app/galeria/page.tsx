import Image from "next/image"
import SectionTitle from "@/components/section-title"

export default function GalleryPage() {
  // Gallery images
  const galleryImages = [
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Estudiantes en clase",
      caption: "Clase de ballet intermedio",
    },
    {
      src: "/placeholder.svg?height=800&width=600",
      alt: "Ensayo de recital",
      caption: "Ensayo para recital anual",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Bailarina en pose",
      caption: "Arabesque perfecto",
    },
    {
      src: "/placeholder.svg?height=800&width=600",
      alt: "Grupo de estudiantes",
      caption: "Nuestros estudiantes avanzados",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Presentación en escenario",
      caption: "Recital 'Las Cuatro Estaciones'",
    },
    {
      src: "/placeholder.svg?height=800&width=600",
      alt: "Clase de puntas",
      caption: "Primera clase de puntas",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Estudio de ballet",
      caption: "Nuestras instalaciones",
    },
    {
      src: "/placeholder.svg?height=800&width=600",
      alt: "Bailarines en salto",
      caption: "Grand jeté en clase avanzada",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Presentación infantil",
      caption: "Presentación grupo infantil",
    },
    {
      src: "/placeholder.svg?height=800&width=600",
      alt: "Bailarina solista",
      caption: "Variación del Lago de los Cisnes",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Clase de ballet",
      caption: "Trabajo en la barra",
    },
    {
      src: "/placeholder.svg?height=800&width=600",
      alt: "Vestuario de ballet",
      caption: "Vestuario para 'El Cascanueces'",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-turquoise/30 via-white to-magenta/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Galería</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">Momentos de Gracia y Pasión</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Nuestra Galería de Imágenes"
            subtitle="Capturando la belleza y dedicación de nuestros estudiantes"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-80 w-full">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4 font-medium">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 bg-gradient-to-r from-violet/10 via-white to-turquoise/10">
        <div className="container mx-auto px-4">
          <SectionTitle title="Videos Destacados" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((video) => (
              <div key={video} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative pt-[56.25%]">
                  {/* Placeholder for video - in a real implementation, this would be a YouTube embed or video player */}
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Video Placeholder {video}</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Recital Anual {2024 - video + 1}</h3>
                  <p className="text-gray-700">
                    Highlights de nuestro recital anual con presentaciones de todos los niveles.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performances */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle title="Nuestras Presentaciones" />

          <div className="space-y-12">
            {[
              {
                title: "Recital Anual",
                description:
                  "Cada año, nuestros estudiantes muestran su progreso y talento en nuestro recital anual, un evento esperado por toda la comunidad. Las presentaciones incluyen coreografías originales y extractos de ballets clásicos adaptados a cada nivel.",
                date: "Diciembre",
                image: "/placeholder.svg?height=600&width=800",
              },
              {
                title: "El Cascanueces",
                description:
                  "Nuestra producción navideña tradicional, donde los estudiantes de todos los niveles participan en este clásico ballet que encanta a audiencias de todas las edades.",
                date: "Diciembre",
                image: "/placeholder.svg?height=600&width=800",
              },
              {
                title: "Gala de Primavera",
                description:
                  "Una celebración de la temporada con piezas contemporáneas y clásicas que destacan la versatilidad y el crecimiento técnico de nuestros bailarines.",
                date: "Septiembre",
                image: "/placeholder.svg?height=600&width=800",
              },
            ].map((performance, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
              >
                <div className="md:w-1/2">
                  <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={performance.image || "/placeholder.svg"}
                      alt={performance.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-turquoise to-violet bg-clip-text text-transparent">
                    {performance.title}
                  </h3>
                  <p className="text-violet font-medium mb-4">{performance.date}</p>
                  <p className="text-gray-700">{performance.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
