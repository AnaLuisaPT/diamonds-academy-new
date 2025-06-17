"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react"

const ContactPageClient = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Contáctanos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario de Contacto */}
        <Card>
          <CardHeader>
            <CardTitle>Envíanos un Mensaje</CardTitle>
            <CardDescription>
              Nos encantaría saber de ti. Utiliza el formulario para cualquier consulta.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Tu nombre" required className="peer" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Tu correo electrónico" required className="peer" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Mensaje</Label>
              <textarea
                id="message"
                placeholder="Escribe tu mensaje aquí"
                className="peer rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                required
                rows={4}
              ></textarea>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Enviar Mensaje</Button>
          </CardFooter>
        </Card>

        {/* Información de Contacto */}
        {[
          {
            icon: <MapPin className="h-8 w-8" />,
            title: "Dirección",
            content: "Madame Adriana Bolland 538\nLa Cisterna, Santiago\nChile",
            action: "Ver en mapa",
            onClick: () =>
              window.open(
                "https://www.google.com/maps/search/?api=1&query=Madame+Adriana+Bolland+538,+La+Cisterna,+Santiago,+Chile",
                "_blank",
              ),
          },
          {
            icon: <Phone className="h-8 w-8" />,
            title: "Teléfono",
            content: "+56 9 4542 1629",
            action: "Llamar ahora",
            onClick: () => window.open("tel:+56945421629"),
          },
          {
            icon: <Mail className="h-8 w-8" />,
            title: "Email",
            content: "diamondsacademy.cl@gmail.com",
            action: "Enviar email",
            onClick: () => window.open("mailto:diamondsacademy.cl@gmail.com"),
          },
          {
            icon: <Clock className="h-8 w-8" />,
            title: "Horarios",
            content: "Lun - Vie: 15:00 - 21:00\nSáb: 09:00 - 17:00\nDom: Cerrado",
            action: "Ver horarios",
            onClick: () => {},
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
                onClick={item.onClick}
              >
                {item.action}
              </Button>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader>
            <CardTitle>Síguenos en Redes Sociales</CardTitle>
            <CardDescription>Mantente al día con nuestras novedades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/diamondsacademy.cl/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all transform hover:scale-110"
                title="Síguenos en Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61564822951693"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all transform hover:scale-110"
                title="Síguenos en Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Síguenos para ver fotos de nuestras clases, eventos especiales y logros de nuestros estudiantes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ContactPageClient
