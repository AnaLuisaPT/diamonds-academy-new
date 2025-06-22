'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SectionTitle from "@/components/section-title";
import { loginUser } from "@/lib/api"; // Asegúrate de que este import sea correcto

export default function LoginPage() {
  // Eliminamos el estado 'userType' que ya no es necesario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Nuevo estado para mostrar errores de login
  const router = useRouter();

  // --- ¡NUEVA FUNCIÓN handleSubmit CON LÓGICA REAL! ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene que la página se recargue
    
    setIsLoading(true);
    setError(""); // Limpiamos errores anteriores

    try {
      // Llamamos a la función de login real de nuestro archivo api.ts
      const response = await loginUser(email, password);
      
      const userRole = response.user.rol.toLowerCase();

      // Opcional: guardar el token para mantener la sesión en futuras visitas
      if (typeof window !== "undefined") {
        localStorage.setItem('authToken', response.token);
      }

      // Redirigimos al usuario basándonos en el ROL que nos devuelve la API
      if (userRole === "Administrador") {
        router.push("/dashboard/admin");
      } else if (userRole === "maestra") {
        router.push("/dashboard/instructor");
      } else if (userRole === "alumno") {
        router.push("/dashboard/alumno");
      } else {
        setError("Rol de usuario no reconocido.");
      }

    } catch (err: any) {
      // Si la API devuelve un error (ej: credenciales inválidas), lo mostramos
      setError(err.message);
    } finally {
      // Esto se ejecuta siempre, haya error o no
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-turquoise/10 via-white to-magenta/10 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <SectionTitle title="Acceso al Sistema" subtitle="Ingresa tus credenciales para continuar" />

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-turquoise to-violet bg-clip-text text-transparent">
                Iniciar Sesión
              </CardTitle>
              <CardDescription>Accede a tu panel personalizado</CardDescription>
            </CardHeader>
            <CardContent>
              {/* El formulario ahora solo llama a la nueva función handleSubmit */}
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">

                  {/* Campo de Correo Electrónico */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="nombre@ejemplo.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>

                  {/* Campo de Contraseña */}
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Contraseña</Label>
                      <Link href="/recuperar-contrasena" className="text-sm text-violet hover:underline">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                  
                  {/* Mostramos el mensaje de error si existe */}
                  {error && <p className="text-sm text-red-600">{error}</p>}

                  {/* Botón de Iniciar Sesión */}
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-turquoise to-violet hover:shadow-md transition-all w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <div className="text-sm text-gray-600 mt-2">
                ¿No tienes una cuenta?{" "}
                <Link href="/registro" className="text-violet hover:underline">
                  Regístrate aquí
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}