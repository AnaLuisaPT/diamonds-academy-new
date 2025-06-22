import type { Metadata } from "next"
import ContactPageClient from "@/components/contact-page-client"

export const metadata: Metadata = {
  title: "Contacto - Diamond's Academy",
  description: "Ponte en contacto con Diamond's Academy. Estamos aquí para ayudarte a comenzar tu viaje en el ballet.",
}

export default function ContactoPage() {
  return <ContactPageClient />
}
