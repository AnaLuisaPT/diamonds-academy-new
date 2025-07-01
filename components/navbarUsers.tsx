"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/app/actions/auth";

export default function NavbarUsers() {
  const pathname = usePathname();
  const router = useRouter();

  // Mostrar solo en rutas de /dashboard/*
  if (!pathname.startsWith('/dashboard')) return null;

  const handleLogout = async () => {
    toast.info("Cerrando sesión…");
    await logout();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm h-16 flex items-center">
      <div className="flex-1 text-center">
        <Link href="/" className="text-xl font-bold gradient-text">
          Diamond's Academy
        </Link>
      </div>
      <div className="pr-4">
        <button
          onClick={handleLogout}
          className="px-4 py-1 text-white font-semibold rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 transition-opacity"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
