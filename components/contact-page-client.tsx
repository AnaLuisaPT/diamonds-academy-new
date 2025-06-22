"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Instagram, Facebook, MapPin, Phone, Mail, Clock, Send, Heart, Star } from "lucide-react"

const ContactPageClient = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSubmitted(true)
    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen gradient-bg-light flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8">
            <div className="w-20 h-20 bg-gradient-to-r from-turquoise to-violet rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold gradient-text mb-4">¡Mensaje Enviado!</h2>
            <p className="text-gray-600 mb-6">
              Gracias por contactarnos. Te responderemos dentro de las próximas 24 horas.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              className="bg-gradient-to-r from-turquoise to-violet hover:from-turquoise/90 hover:to-violet/90"
            >
              Enviar otro mensaje
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-float">¡Hablemos!</h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Estamos aquí para responder todas tus preguntas y ayudarte a comenzar tu viaje en el ballet
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <div className="flex items-center bg-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
                <Phone className="w-5 h-5 mr-2" />
                <span>Respuesta rápida</span>
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
                <Heart className="w-5 h-5 mr-2" />
                <span>Atención personalizada</span>
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
                <Star className="w-5 h-5 mr-2" />
                <span>Asesoría experta</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario de Contacto - Más prominente */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-turquoise to-violet p-1">
                  <div className="bg-white rounded-lg">
                    <CardHeader className="text-center pb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-turquoise to-violet rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-3xl gradient-text">Envíanos un Mensaje</CardTitle>
                      <CardDescription className="text-lg">
                        Cuéntanos sobre ti y cómo podemos ayudarte en tu viaje de ballet
                      </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-lg font-semibold">
                              Nombre *
                            </Label>
                            <Input
                              id="name"
                              placeholder="¿Cómo te llamas?"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="h-12 text-lg border-2 focus:border-violet transition-all duration-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-lg font-semibold">
                              Email *
                            </Label>
                            <Input
                              type="email"
                              id="email"
                              placeholder="tu@email.com"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="h-12 text-lg border-2 focus:border-violet transition-all duration-300"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-lg font-semibold">
                            Mensaje *
                          </Label>
                          <textarea
                            id="message"
                            placeholder="Cuéntanos sobre tu interés en el ballet, tu experiencia previa, o cualquier pregunta que tengas..."
                            className="w-full h-32 px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-violet focus:outline-none transition-all duration-300 resize-none"
                            required
                            value={formData.message}
                            onChange={handleInputChange}
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="pt-6">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-turquoise to-violet hover:from-turquoise/90 hover:to-violet/90 transform hover:scale-105 transition-all duration-300"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              Enviar Mensaje
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </form>
                  </div>
                </div>
              </Card>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-6">
              {[
                {
                  icon: <MapPin className="h-6 w-6" />,
                  title: "Nuestra Ubicación",
                  content: "Madame Adriana Bolland 538\nLa Cisterna, Santiago\nChile",
                  action: "Ver en mapa",
                  gradient: "from-blue-500 to-purple-600",
                  onClick: () =>
                    window.open(
                      "https://www.google.com/maps/search/?api=1&query=Madame+Adriana+Bolland+538,+La+Cisterna,+Santiago,+Chile",
                      "_blank",
                    ),
                },
                {
                  icon: <Phone className="h-6 w-6" />,
                  title: "Llámanos",
                  content: "+56 9 4542 1629",
                  action: "Llamar ahora",
                  gradient: "from-green-500 to-teal-600",
                  onClick: () => window.open("tel:+56945421629"),
                },
                {
                  icon: <Mail className="h-6 w-6" />,
                  title: "Escríbenos",
                  content: "diamondsacademy.cl@gmail.com",
                  action: "Enviar email",
                  gradient: "from-pink-500 to-rose-600",
                  onClick: () => window.open("mailto:diamondsacademy.cl@gmail.com"),
                },
                {
                  icon: <Clock className="h-6 w-6" />,
                  title: "Horarios",
                  content: "Lun - Vie: 15:00 - 21:00\nSáb: 09:00 - 17:00\nDom: Cerrado",
                  action: "Ver más info",
                  gradient: "from-orange-500 to-red-600",
                  onClick: () => {},
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line mb-4 leading-relaxed">{item.content}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-violet border-violet hover:bg-violet hover:text-white transition-all duration-300"
                      onClick={item.onClick}
                    >
                      {item.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Redes Sociales Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto text-center shadow-2xl border-0">
            <CardHeader className="pb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl gradient-text mb-4">Síguenos en Redes Sociales</CardTitle>
              <CardDescription className="text-lg">
                Únete a nuestra comunidad y mantente al día con nuestras novedades, eventos y logros de nuestros
                estudiantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-8 mb-8">
                <a
                  href="https://www.instagram.com/diamondsacademy.cl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  title="Síguenos en Instagram"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
                    <Instagram className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-semibold mt-2 text-gray-700">Instagram</p>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61564822951693"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  title="Síguenos en Facebook"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 group-hover:-rotate-6">
                    <Facebook className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-semibold mt-2 text-gray-700">Facebook</p>
                </a>
              </div>
              <div className="bg-gradient-to-r from-turquoise/10 to-violet/10 rounded-2xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  📸 <strong>Fotos de nuestras clases</strong> • 🎭 <strong>Eventos especiales</strong> • 🏆{" "}
                  <strong>Logros de estudiantes</strong> • 💃 <strong>Tips de ballet</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="gradient-bg text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            No esperes más para formar parte de la familia Diamond's Academy
          </p>
          <button
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-300"
            style={{
              backgroundColor: "white",
              color: "rgb(138, 43, 226)", // violet
              border: "none",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f9fafb"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white"
            }}
            onClick={() => (window.location.href = "/inscripcion")}
          >
            Inscríbete Ahora
          </button>
        </div>
      </section>
    </div>
  )
}

export default ContactPageClient
