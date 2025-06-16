import SectionTitle from "@/components/section-title"
import InteractiveMap from "@/components/interactive-map"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, MessageCircle, Car } from "lucide-react"

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-turquoise/30 via-white to-magenta/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contacto</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            Estamos aquí para responder todas tus preguntas sobre nuestras clases de ballet
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle title="Información de Contacto" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: <MapPin className="h-8 w-8" />,
                title: "Dirección",
                content: "Av. Providencia 1234\nProvidencia, Santiago\nChile",
                action: "Ver en mapa",
              },
              {
                icon: <Phone className="h-8 w-8" />,
                title: "Teléfono",
                content: "+56 9 1234 5678",
                action: "Llamar ahora",
              },
              {
                icon: <Mail className="h-8 w-8" />,
                title: "Email",
                content: "info@diamondsacademy.cl\ncontacto@diamondsacademy.cl",
                action: "Enviar email",
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Horarios",
                content: "Lun - Vie: 15:00 - 21:00\nSáb: 09:00 - 17:00\nDom: Cerrado",
                action: "Ver horarios",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-turquoise to-violet rounded-full flex items-center justify-center text-white mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 whitespace-pre-line mb-4">{item.content}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-violet border-violet hover:bg-violet hover:text-white"
                  >
                    {item.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-to-r from-violet/10 via-white to-turquoise/10">
        <div className="container mx-auto px-4">
          <SectionTitle title="Nuestra Ubicación" subtitle="Encuéntranos fácilmente en el corazón de Santiago" />

          <div className="max-w-6xl mx-auto">
            <InteractiveMap
              address="Av. Providencia 1234, Providencia, Santiago, Chile"
              latitude={-33.4489}
              longitude={-70.6693}
              zoom={16}
              height="500px"
              className="mb-8"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <MapPin className="h-5 w-5 mr-2 text-violet" />
                    Transporte Público
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Metro: Estación Pedro de Valdivia (Línea 1)</li>
                    <li>• Buses: 210, 213, 214, 505</li>
                    <li>• A 5 minutos caminando del metro</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Car className="h-5 w-5 mr-2 text-violet" />
                    Estacionamiento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Estacionamiento gratuito disponible</li>
                    <li>• Espacios para 20 vehículos</li>
                    <li>• Acceso por calle lateral</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Clock className="h-5 w-5 mr-2 text-violet" />
                    Horarios de Atención
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Lunes a Viernes: 15:00 - 21:00</li>
                    <li>• Sábados: 09:00 - 17:00</li>
                    <li>• Domingos: Cerrado</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionTitle title="Envíanos un Mensaje" subtitle="¿Tienes preguntas? Nos encantaría ayudarte" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2 text-violet" />
                      Formulario de Contacto
                    </CardTitle>
                    <CardDescription>Completa el formulario y te responderemos en menos de 24 horas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Nombre</Label>
                          <Input id="firstName" placeholder="Tu nombre" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Apellido</Label>
                          <Input id="lastName" placeholder="Tu apellido" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input id="email" type="email" placeholder="tu@email.com" />
                      </div>

                      <div>
                        <Label htmlFor="phone">Teléfono (opcional)</Label>
                        <Input id="phone" type="tel" placeholder="+56 9 1234 5678" />
                      </div>

                      <div>
                        <Label htmlFor="subject">Asunto</Label>
                        <select
                          id="subject"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet"
                        >
                          <option value="">Selecciona un tema</option>
                          <option value="info-clases">Información sobre clases</option>
                          <option value="inscripcion">Proceso de inscripción</option>
                          <option value="horarios">Consulta de horarios</option>
                          <option value="precios">Información de precios</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="message">Mensaje</Label>
                        <Textarea id="message" placeholder="Cuéntanos en qué podemos ayudarte..." rows={5} />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-turquoise to-violet hover:shadow-lg transition-all"
                      >
                        Enviar Mensaje
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>¿Por qué elegirnos?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Instructores certificados con experiencia internacional",
                        "Instalaciones modernas y completamente equipadas",
                        "Clases para todas las edades y niveles",
                        "Ambiente acogedor y profesional",
                        "Metodología adaptada a cada estudiante",
                        "Presentaciones y recitales anuales",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-turquoise to-violet mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Síguenos en Redes Sociales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      {[
                        { name: "Instagram", icon: "📷", url: "#" },
                        { name: "Facebook", icon: "📘", url: "#" },
                        { name: "YouTube", icon: "📺", url: "#" },
                        { name: "TikTok", icon: "🎵", url: "#" },
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          className="w-12 h-12 bg-gradient-to-r from-turquoise to-violet rounded-full flex items-center justify-center text-white text-xl hover:shadow-lg transition-all transform hover:scale-110"
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
