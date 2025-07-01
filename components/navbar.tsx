"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/app/actions/auth";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  const handleAuthClick = async () => {
    if (isDashboard) {
      toast.info("Cerrando sesión...");
      await logout();
    } else {
      router.push("/login");
    }
  };

  if (isDashboard) {
    // No renderizamos el navbar público cuando estamos en dashboard,
    // Next.js pickeará el NavbarUsers en su lugar.
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold gradient-text">
          <Link href="/">Diamond's Academy</Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="font-medium text-gray-600 hover:text-violet-600">
            Inicio
          </Link>
          <Link href="/nosotros" className="font-medium text-gray-600 hover:text-violet-600">
            Nosotros
          </Link>
          <Link href="/clases" className="font-medium text-gray-600 hover:text-violet-600">
            Clases
          </Link>
          <Link href="/instructores" className="font-medium text-gray-600 hover:text-violet-600">
            Instructores
          </Link>
          <Link href="/galeria" className="font-medium text-gray-600 hover:text-violet-600">
            Galería
          </Link>
          <Link href="/testimonios" className="font-medium text-gray-600 hover:text-violet-600">
            Testimonios
          </Link>
          <Link href="/contacto" className="font-medium text-gray-600 hover:text-violet-600">
            Contacto
          </Link>
        </div>
        <div>
          <button
            onClick={handleAuthClick}
            className="px-6 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90"
          >
            {isDashboard ? "Cerrar Sesión" : "Ingresar"}
          </button>
        </div>
      </div>
    </nav>
  );
}
