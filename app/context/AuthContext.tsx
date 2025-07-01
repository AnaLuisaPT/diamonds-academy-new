"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { loginUser as apiLoginUser } from "@/lib/api";

interface User {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Al inicio, cargo user desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Llamada a tu API, que además del JSON de respuesta
      // devuelve la cookie HttpOnly `user_session`
      const { user: loggedUser } = await apiLoginUser(email, password);
      // Guardar el usuario en localStorage (el token ya vino en cookie)
      localStorage.setItem("authUser", JSON.stringify(loggedUser));
      setUser(loggedUser);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Solo eliminamos el usuario del cliente; la cookie HttpOnly expirará o la limpiará tu backend
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}