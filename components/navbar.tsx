"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full gradient-bg-light shadow-lg">
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2 no-underline">
            <span className="text-2xl font-bold gradient-text">
              Diamond&apos;s Academy
            </span>
          </Link>

          <button
            className="md:hidden text-gray-800 hover:text-violet transition-colors z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>
        </div>

        <div
          className={`
            md:hidden absolute top-0 left-0 w-full h-screen bg-white transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <nav className="pt-24 px-4">
            <div className="flex flex-col space-y-4">
              <NavLinks mobile onClick={toggleMenu} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

function NavLinks({ mobile = false, onClick = () => {} }: { mobile?: boolean; onClick?: () => void }) {
  const links = [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/clases", label: "Clases" },
    { href: "/instructores", label: "Instructores" },
    { href: "/galeria", label: "Galería" },
    { href: "/testimonios", label: "Testimonios" },
    { href: "/contacto", label: "Contacto" },
  ]
  
  const mobileLinkClasses = "block px-4 py-3 text-lg text-gray-800 hover:bg-gradient-to-r hover:from-turquoise/20 hover:to-violet/20 rounded-md transition-all"
  const desktopLinkClasses = "text-gray-800 hover:text-violet transition-colors font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-turquoise after:to-violet hover:after:w-full after:transition-all after:duration-300"
  
  const mobileButtonClasses = "block w-full px-4 py-3 gradient-bg text-white rounded-md mt-4 text-center font-medium text-lg"
  const desktopButtonClasses = "gradient-bg text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={mobile ? mobileLinkClasses : desktopLinkClasses}
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/login"
        className={mobile ? mobileButtonClasses : desktopButtonClasses}
        onClick={onClick}
      >
        Ingresar
      </Link>
    </>
  )
}