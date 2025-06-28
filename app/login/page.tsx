"use client" // no tocar esta linea, funcionamiento de pag interactiva

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react"
import { loginUser } from "@/lib/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("El correo y la contraseña son requeridos.")
      return
    }

    setIsLoading(true)
    try {
      const response = await loginUser(email, password)
      if (response.token) {
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      const userRole = response.user.rol.toLowerCase()
      if (userRole === "administrador") {
        router.push("/dashboard/admin")
      } else if (userRole === "maestra" || userRole === "instructor") {
        router.push("/dashboard/instructor")
      } else if (userRole === "alumno") {
        router.push("/dashboard/alumno")
      } else {
        setError("Rol de usuario no reconocido.")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg-light pt-20 px-4">
      <Card className="w-full max-w-md shadow-2xl border-violet-100 border rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <Link href="/">
            <h2 className="text-2xl font-bold gradient-text">Diamond's Academy</h2>
          </Link>
          <CardTitle className="text-3xl font-bold text-gray-800">Acceso al Panel</CardTitle>
          <CardDescription className="text-gray-600">Ingresa tus credenciales para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@diamante.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="h-12 pl-10 focus-visible:ring-violet-500"
                />
              </div>
            </div>
            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700">Contraseña</Label>
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
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="h-12 pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {/* Error */}
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
  )
}
