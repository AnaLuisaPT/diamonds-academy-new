"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/app/actions/auth"; // Importaremos la nueva acción de logout

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isInDashboard = pathname.startsWith('/dashboard');

  const handleAuthClick = async () => {
    if (isInDashboard) {
      toast.info("Cerrando sesión...");
      // Llamamos a la Server Action para que borre la cookie de sesión
      await logout();
      // Ya no es necesario el router.push, la acción de logout se encargará de refrescar/redirigir
    } else {
      router.push('/login');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold gradient-text">
              Diamond's Academy
            </Link>
          </div>
          {/* (RESTAURADO) Tus enlaces de navegación */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-medium text-gray-600 hover:text-violet-600 transition-colors">Inicio</Link>
            <Link href="/nosotros" className="font-medium text-gray-600 hover:text-violet-600 transition-colors">Nosotros</Link>
            <Link href="/clases" className="font-medium text-gray-600 hover:text-violet-600 transition-colors">Clases</Link>
            <Link href="/instructores" className="font-medium text-gray-600 hover:text-violet-600 transition-colors">Instructores</Link>
            <Link href="/galeria" className="font-medium text-gray-600 hover:text-violet-600 transition-colors">Galería</Link>
            <Link href="/testimonios" className="font-medium text-gray-600 hover:text-violet-600 transition-colors">Testimonios</Link>
            <Link href="/contacto" className="font-medium text-gray-600 hover:text-violet-600 transition-colors">Contacto</Link>
          </div>
          <div>
            <button 
              onClick={handleAuthClick} 
              className="px-6 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 transition-opacity"
            >
              {isInDashboard ? "Cerrar Sesión" : "Ingresar"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}