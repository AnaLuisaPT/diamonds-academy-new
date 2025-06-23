"use client" // no tocar esta linea, funcionamiento de pag interactiva
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles } from "lucide-react"
import SectionTitle from "@/components/section-title"
import { loginUser } from "@/lib/api" // Importamos la función de login desde nuestro archivo de API

export default function LoginPage() {
  // Simplificamos el estado: ya no necesitamos 'userType'
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null) // Un único estado para los errores
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Previene que la página se recargue
    setError(null) // Limpiamos errores previos

    // Validación simple en el frontend
    if (!email || !password) {
      setError("El correo y la contraseña son requeridos.")
      return
    }

    setIsLoading(true)

    try {
      // 1. LLAMADA REAL A LA API
      const response = await loginUser(email, password);

      // 2. ¡IMPLEMENTACIÓN DEL TOKEN!
      // Si el login es exitoso, la respuesta contiene el token.
      // Lo guardamos en el localStorage del navegador para usarlo en futuras peticiones.
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      
      // 3. OBTENEMOS EL ROL REAL DESDE LA RESPUESTA DE LA API
      const userRole = response.user.rol.toLowerCase();

      // 4. REDIRIGIMOS SEGÚN EL ROL REAL
      if (userRole === "administrador") {
        router.push("/dashboard/admin");
      } else if (userRole === "maestra" || userRole === "instructor") {
        router.push("/dashboard/instructor");
      } else if (userRole === "alumno") {
        router.push("/dashboard/alumno");
      } else {
        setError("Rol de usuario no reconocido.");
      }

    } catch (err: any) {
      // 5. Si la API devuelve un error (ej: credenciales inválidas), lo mostramos
      setError(err.message);
    } finally {
      // Esto se ejecuta siempre, para asegurar que el botón se reactive
      setIsLoading(false);
    }
  }
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background con gradiente animado */}
      <div className="absolute inset-0 gradient-bg opacity-90"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse-slow"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Diamond's Academy</h1>
            <p className="text-white/80 text-lg">Bienvenido de vuelta</p>
          </div>

          {/* Card principal */}
          <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/95 relative z-20">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold gradient-text">Iniciar Sesión</CardTitle>
              <CardDescription className="text-base">Ingresa a tu panel personalizado</CardDescription>
            </CardHeader>

            <CardContent>
              {/* El formulario ahora es más simple y llama a la nueva función handleSubmit */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 pl-10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Contraseña</Label>
                    <Link href="/recuperar-contrasena" className="text-sm text-violet hover:underline">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                {/* Div para mostrar errores de la API */}
                {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-turquoise to-violet hover:shadow-md transition-all"
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="text-center pt-6">
              <div className="w-full">
                <div className="text-sm text-gray-600">
                  ¿No tienes una cuenta?{" "}
                  <Link href="/registro" className="text-violet hover:text-violet/80 font-semibold">
                    Regístrate aquí
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}