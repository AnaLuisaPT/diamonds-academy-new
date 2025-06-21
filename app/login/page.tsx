"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, GraduationCap, Shield, Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles } from "lucide-react"

export default function LoginPage() {
  const [userType, setUserType] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; userType?: string }>({})
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validación básica
    const newErrors: { email?: string; password?: string; userType?: string } = {}

    if (!userType) newErrors.userType = "Selecciona un tipo de usuario"
    if (!email) newErrors.email = "El correo es requerido"
    if (!password) newErrors.password = "La contraseña es requerida"
    if (password && password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

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
          setErrors({ userType: "Por favor selecciona un tipo de usuario" })
      }
      setIsLoading(false)
    }, 1500)
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

  const getUserTypeInfo = () => {
    switch (userType) {
      case "administrador":
        return {
          title: "Panel de Administración",
          description: "Gestiona toda la academia",
          gradient: "from-red-500 to-pink-600",
        }
      case "instructor":
        return {
          title: "Panel de Instructor",
          description: "Gestiona tus clases y estudiantes",
          gradient: "from-blue-500 to-purple-600",
        }
      case "alumno":
        return {
          title: "Panel de Estudiante",
          description: "Accede a tus clases y progreso",
          gradient: "from-green-500 to-teal-600",
        }
      default:
        return {
          title: "Acceso al Sistema",
          description: "Selecciona tu tipo de usuario",
          gradient: "from-turquoise to-violet",
        }
    }
  }

  const userInfo = getUserTypeInfo()

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
            <CardHeader className="text-center pb-6 relative z-10">
              <div
                className={`w-16 h-16 bg-gradient-to-r ${userInfo.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 ${userType ? "scale-110" : ""}`}
              >
                {getUserIcon()}
              </div>
              <CardTitle className="text-2xl font-bold gradient-text">{userInfo.title}</CardTitle>
              <CardDescription className="text-base">{userInfo.description}</CardDescription>
            </CardHeader>

            <CardContent className="relative z-30">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tipo de Usuario */}
                <div className="space-y-2 relative z-50">
                  <Label htmlFor="userType" className="text-sm font-semibold text-gray-700">
                    Tipo de Usuario *
                  </Label>
                  <div className="relative">
                    <Select value={userType} onValueChange={setUserType}>
                      <SelectTrigger
                        className={`h-12 ${errors.userType ? "border-red-500" : "border-gray-300"} focus:border-violet transition-all duration-300 relative z-50`}
                      >
                        <SelectValue placeholder="¿Quién eres?" />
                      </SelectTrigger>
                      <SelectContent
                        className="relative z-[100] bg-white border border-gray-200 shadow-2xl"
                        style={{ zIndex: 100 }}
                      >
                        <SelectItem value="administrador" className="relative z-[101]">
                          <div className="flex items-center gap-3 py-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                              <Shield className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold">Administrador</div>
                              <div className="text-xs text-gray-500">Gestión completa</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="instructor" className="relative z-[101]">
                          <div className="flex items-center gap-3 py-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <GraduationCap className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold">Instructor</div>
                              <div className="text-xs text-gray-500">Clases y estudiantes</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="alumno" className="relative z-[101]">
                          <div className="flex items-center gap-3 py-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold">Estudiante</div>
                              <div className="text-xs text-gray-500">Mi progreso</div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Correo Electrónico *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`h-12 pl-10 ${errors.email ? "border-red-500" : "border-gray-300"} focus:border-violet transition-all duration-300`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Contraseña *
                    </Label>
                    <Link
                      href="/recuperar-contrasena"
                      className="text-sm text-violet hover:text-violet/80 transition-colors"
                    >
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
                      className={`h-12 pl-10 pr-10 ${errors.password ? "border-red-500" : "border-gray-300"} focus:border-violet transition-all duration-300`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-turquoise to-violet hover:from-turquoise/90 hover:to-violet/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Iniciando sesión...
                    </>
                  ) : (
                    <>
                      Iniciar Sesión
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="text-center pt-6">
              <div className="w-full">
                <div className="text-sm text-gray-600">
                  ¿No tienes una cuenta?{" "}
                  <Link href="/registro" className="text-violet hover:text-violet/80 font-semibold transition-colors">
                    Regístrate aquí
                  </Link>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    ← Volver al inicio
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <p className="text-white/80 text-sm text-center mb-2">
              <strong>Credenciales de prueba:</strong>
            </p>
            <div className="text-white/70 text-xs space-y-1">
              <div>• Admin: admin@diamondsacademy.cl / admin123</div>
              <div>• Instructor: instructor@diamondsacademy.cl / instructor123</div>
              <div>• Estudiante: estudiante@diamondsacademy.cl / estudiante123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
