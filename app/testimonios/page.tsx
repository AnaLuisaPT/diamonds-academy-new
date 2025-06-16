import SectionTitle from "@/components/section-title"
import Image from "next/image"

export default function TestimonialsPage() {
  const testimonials = [
    {
      quote:
        "Desde que mi hija comenzó en Diamond's Academy, su confianza, postura y amor por la danza han florecido increíblemente. Los instructores son atentos y profesionales, creando un ambiente donde ella se siente motivada a superarse cada día. ¡Estamos felices!",
      author: "Sofía M.",
      role: "Madre de alumna",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      quote:
        "La enseñanza es de primer nivel. He notado una gran mejora en mi técnica y los instructores son muy motivadores. Como adulta que retomó el ballet después de muchos años, aprecio especialmente la paciencia y el enfoque personalizado.",
      author: "Camila R.",
      role: "Estudiante de Ballet Adulto",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      quote:
        "Mi hijo de 7 años estaba muy nervioso por comenzar ballet, pero después de su primera clase en Diamond's Academy, no quería irse. El ambiente acogedor y la forma en que los maestros hacen que el aprendizaje sea divertido han hecho toda la diferencia.",
      author: "Javier L.",
      role: "Padre de alumno",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      quote:
        "Como bailarina profesional, puedo decir que la formación que recibí en Diamond's Academy fue fundamental para mi carrera. La atención al detalle técnico y la disciplina que me inculcaron me prepararon perfectamente para el mundo profesional del ballet.",
      author: "Valentina S.",
      role: "Ex-alumna, ahora bailarina profesional",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      quote:
        "Después de probar varias academias, finalmente encontré mi hogar en Diamond's. La combinación de rigor técnico y ambiente de apoyo es exactamente lo que buscaba. He progresado más en un año aquí que en tres años en otras escuelas.",
      author: "Martín G.",
      role: "Estudiante de nivel intermedio",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      quote:
        "Como médico, aprecio el enfoque de Diamond's Academy en la técnica correcta y la prevención de lesiones. Mi hija no solo está aprendiendo ballet, sino también hábitos saludables y conciencia corporal que le servirán toda la vida.",
      author: "Dra. Ana P.",
      role: "Madre de alumna",
      image: "/placeholder.svg?height=150&width=150",
    },
  ]

  const videoTestimonials = [
    {
      title: "La experiencia de María en Diamond's Academy",
      description: "María nos cuenta cómo el ballet transformó su vida y mejoró su confianza.",
      thumbnail: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "De estudiante a profesional: La historia de Carlos",
      description:
        "Carlos comparte su trayectoria desde sus primeras clases hasta convertirse en bailarín profesional.",
      thumbnail: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-turquoise/30 via-white to-magenta/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Testimonios</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">Nuestros Alumnos y Padres Hablan</p>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-turquoise/10 to-violet/10 p-8 rounded-lg relative">
              <div className="absolute -top-6 -left-6 text-8xl text-violet opacity-30">"</div>
              <p className="text-xl mb-6 text-gray-700 italic relative z-10">
                El ambiente en Diamond&apos;s Academy es incomparable. Los maestros no solo enseñan técnica, sino que
                inspiran a cada estudiante a encontrar su propia voz artística. Mi hija ha florecido aquí, desarrollando
                no solo habilidades de ballet sino también confianza, disciplina y una pasión por el arte que se
                extiende a todos los aspectos de su vida.
              </p>
              <div className="flex items-center">
                <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Retrato de Laura M."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">Laura M.</p>
                  <p className="text-violet">Madre de alumna avanzada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-gradient-to-r from-violet/10 via-white to-turquoise/10">
        <div className="container mx-auto px-4">
          <SectionTitle title="Lo Que Dicen Nuestros Alumnos" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={`Retrato de ${testimonial.author}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-violet text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle title="Testimonios en Video" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {videoTestimonials.map((video, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative pt-[56.25%]">
                  {/* Placeholder for video - in a real implementation, this would be a YouTube embed or video player */}
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="h-0 w-0 border-y-8 border-y-transparent border-l-[15px] border-l-white"></div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                  <p className="text-gray-700">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
