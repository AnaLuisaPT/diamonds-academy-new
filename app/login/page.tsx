'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SectionTitle from "@/components/section-title"
import { User, GraduationCap, Shield } from 'lucide-react'

export default function LoginPage() {
  const [userType, setUserType] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de autenticación
    setTimeout(() => {
      // Redirigir según el tipo de usuario
      switch (userType) {
        case "administrador":
          router.push("/dashboard/admin")
          break
        case "instructor":
          router.push("/dashboard/instructor")
          break
        case "alumno":
          router.push("/dashboard/alumno")
          break
        default:
          alert("Por favor selecciona un tipo de usuario")
      }
      setIsLoading(false)
    }, 1000)
  }

  const getUserIcon = () => {
    switch (userType) {
      case "administrador":
        return <Shield className="w-5 h-5" />
      case "instructor":
        return <GraduationCap className="w-5 h-5" />
      case "alumno":
        return <User className="w-5 h-5" />
      default:
        return <User className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-turquoise/10 via-white to-magenta/10 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <SectionTitle title="Acceso al Sistema" subtitle="Selecciona tu tipo de usuario e ingresa tus credenciales" />

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-turquoise to-violet bg-clip-text text-transparent flex items-center gap-2">
                {getUserIcon()}
                Iniciar Sesión
              </CardTitle>
              <CardDescription>Accede a tu panel personalizado según tu rol</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="userType">Tipo de Usuario</Label>
                    <Select value={userType} onValueChange={setUserType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu tipo de usuario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administrador">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Administrador
                          </div>
                        </SelectItem>
                        <SelectItem value="instructor">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" />
                            Instructor
                          </div>
                        </SelectItem>
                        <SelectItem value="alumno">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Alumno
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-turquoise to-violet hover:shadow-md transition-all"
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
  )
}
