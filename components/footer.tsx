// components/footer.tsx

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Contenedor principal del grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          
          {/* Columna 1: Logo y Descripción */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Diamond's Academy
            </h3>
            <p className="text-gray-400 leading-relaxed">
              La elegancia de la danza. Cultivando la gracia, la disciplina y el arte del ballet clásico para todas las edades.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/clases" className="text-gray-400 hover:text-white transition-colors">Clases</Link></li>
              <li><Link href="/nosotros" className="text-gray-400 hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link href="/galeria" className="text-gray-400 hover:text-white transition-colors">Galería</Link></li>
              <li><Link href="/contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contacto
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt w-5 mt-1 mr-3 text-turquoise"></i>
                <span>Casa Matriz - Madame Adriana Bolland #538, La Cisterna</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt w-5 mr-3 text-turquoise"></i>
                <a href="tel:+56945421629" className="hover:text-white transition-colors">+56 9 4542 1629</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope w-5 mr-3 text-turquoise"></i>
                <a href="mailto:diamondsacademy.cl@omail.com" className="hover:text-white transition-colors break-all">diamondsacademy@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra inferior de Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Diamond's Academy. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}