import Image from "next/image"
import SectionTitle from "@/components/section-title"
import { Images } from "lucide-react"
import { imageConfig } from "@/lib/image-config"
import VideoPlayer from "@/components/video-player"

export default function GalleryPage() {
  // Gallery images
  const galleryImages = [
    {
      image: imageConfig.galeria.galeria1,
      alt: "Estudiantes en concentracion",
      caption: "Ensayo ballet intermedio",
    },
    {
      image: imageConfig.galeria.galeria2,
      alt: "Preparacion de recital",
      caption: "Preparacion recital anual",
    },
    {
      image: imageConfig.galeria.galeria12,
      alt: "Bailarina formativo",
      caption: "Ensayos formativos",
    },
    {
      image: imageConfig.galeria.galeria4,
      alt: "Bailarina en el escenario",
      caption: "Nuestros estudiantes avanzados",
    },
    {
      image: imageConfig.galeria.galeria5,
      alt: "Presentación en escenario",
      caption: "Recital 'Las Cuatro Estaciones'",
    },
    {
      image: imageConfig.galeria.galeria6,
      alt: "Odette",
      caption: "Variacion Lago de los Cisnes",
    },
    {
      image: imageConfig.galeria.galeria7,
      alt: "Estudio de ballet",
      caption: "Ballet contemporaneo",
    },
    {
      image: imageConfig.galeria.galeria8,
      alt: "Bailarines en cannon",
      caption: "Cannon clase avanzada",
    },
    {
      image: imageConfig.galeria.galeria9,
      alt: "Presentación grupo juvenil",
      caption: "Presentación grupo juvenil",
    },
    {
      image: imageConfig.galeria.galeria10,
      alt: "Bailarinas",
      caption: "Variacion propia grupo adulto",
    },
    {
      image: imageConfig.galeria.galeria11,
      alt: "Bailarina infantil",
      caption: "Bailarina grupo infantil",
    },
    {
      image: imageConfig.galeria.galeria3,
      alt: "Bailarin",
      caption: "Bailarin destacado 2024",
    },
  ]

    // Gallery videos
  const galleryVideos = [
    {
      src: imageConfig.videos.escenario1,
      title: "Fantasias del movimiento",
      description: "Envolvemos al publico en nuestra magia",
      duration: "0:12",
      autoplay: true, // Autoplay específico para este video
      muted: true,
      loop: true,
    },
    {
      src: imageConfig.videos.escenario2,
      title: "El sueño es real",
      description: "Te impulsamos a cumplir tus metas",
      duration: "0:10",
      autoplay: true, // Autoplay específico para este video
      muted: true,
      loop: true,
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
                    src={image.image || "/placeholder.svg"}
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
          <SectionTitle title="Videos Destacados" subtitle="Momentos especiales de nuestras clases y presentaciones" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryVideos.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64 md:h-80">
                  <VideoPlayer
                    src={video.src}
                    title={video.title}
                    className="h-full"
                    autoplay={video.autoplay} // Autoplay inmediato
                    muted={video.muted} // Muted para que funcione
                    loop={video.loop} // Loop para repetir
                  />
                </div> 
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">{video.title}</h3>
                    <span className="text-sm text-violet font-medium">{video.duration}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performances */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Nuestras Presentaciones"
            subtitle="" />

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
