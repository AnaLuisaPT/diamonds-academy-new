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
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  GraduationCap,
  Shield,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  UserPlus,
  Phone,
} from "lucide-react"

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptNewsletter: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.userType) newErrors.userType = "Selecciona un tipo de usuario"
    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es requerido"
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es requerido"
    if (!formData.email.trim()) newErrors.email = "El correo es requerido"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Correo inválido"
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"
    if (!formData.password) newErrors.password = "La contraseña es requerida"
    else if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres"
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirma tu contraseña"
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden"
    if (!formData.acceptTerms) newErrors.acceptTerms = "Debes aceptar los términos y condiciones"

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    // Simulación de registro
    setTimeout(() => {
      alert("¡Registro exitoso! Revisa tu correo para activar tu cuenta.")
      router.push("/login")
    }, 2000)
  }

  const getUserIcon = () => {
    switch (formData.userType) {
      case "administrador":
        return <Shield className="w-5 h-5" />
      case "instructor":
        return <GraduationCap className="w-5 h-5" />
      case "alumno":
        return <User className="w-5 h-5" />
      default:
        return <UserPlus className="w-5 h-5" />
    }
  }

  const getUserTypeInfo = () => {
    switch (formData.userType) {
      case "administrador":
        return {
          title: "Registro de Administrador",
          description: "Acceso completo al sistema",
          gradient: "from-red-500 to-pink-600",
        }
      case "instructor":
        return {
          title: "Registro de Instructor",
          description: "Gestiona clases y estudiantes",
          gradient: "from-blue-500 to-purple-600",
        }
      case "alumno":
        return {
          title: "Registro de Estudiante",
          description: "Accede a tus clases y progreso",
          gradient: "from-green-500 to-teal-600",
        }
      default:
        return {
          title: "Crear Nueva Cuenta",
          description: "Únete a Diamond's Academy",
          gradient: "from-turquoise to-violet",
        }
    }
  }

  const userInfo = getUserTypeInfo()

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-90"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Diamond's Academy</h1>
            <p className="text-white/80 text-lg">Crea tu cuenta</p>
          </div>

          {/* Card principal */}
          <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/95 relative z-20">
            <CardHeader className="text-center pb-6">
              <div
                className={`w-16 h-16 bg-gradient-to-r ${userInfo.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 ${formData.userType ? "scale-110" : ""}`}
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
                  <Label className="text-sm font-semibold text-gray-700">Tipo de Usuario *</Label>
                  <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
                    <SelectTrigger
                      className={`h-12 ${errors.userType ? "border-red-500" : "border-gray-300"} focus:border-violet transition-all duration-300`}
                    >
                      <SelectValue placeholder="¿Cómo te quieres registrar?" />
                    </SelectTrigger>
                    <SelectContent className="relative z-[100] bg-white border border-gray-200 shadow-2xl">
                      <SelectItem value="alumno">
                        <div className="flex items-center gap-3 py-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold">Estudiante</div>
                            <div className="text-xs text-gray-500">Tomar clases de ballet</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="instructor">
                        <div className="flex items-center gap-3 py-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold">Instructor</div>
                            <div className="text-xs text-gray-500">Enseñar ballet</div>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
                </div>

                {/* Nombre y Apellido */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Nombre *</Label>
                    <Input
                      placeholder="Tu nombre"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`h-12 ${errors.firstName ? "border-red-500" : "border-gray-300"} focus:border-violet transition-all duration-300`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Apellido *</Label>
                    <Input
                      placeholder="Tu apellido"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`h-12 ${errors.lastName ? "border-red-500" : "border-gray-300"} focus:border-violet transition-all duration-300`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Correo Electrónico *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`h-12 pl-10 ${errors.email ? "border-red-500" : "border-gray-300"} focus:border-violet transition-all duration-300`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Teléfono */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Teléfono *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="tel"
                      placeholder="+56 9 1234 5678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`h-12 pl-10 ${errors.phone ? "border-red-500" : "border-gray-300"} focus:border-violet transition-all duration-300`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                {/* Contraseñas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Contraseña *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`h-12 pl-10 pr-10 ${errors.password ? "border-red-500" : "border-gray-300"} focus:border-violet transition-all duration-300`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Confirmar Contraseña *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className={`h-12 pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} focus:border-violet transition-all duration-300`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <Label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                        Acepto los{" "}
                        <Link href="/terminos" className="text-violet hover:text-violet/80 underline">
                          términos y condiciones
                        </Link>{" "}
                        y la{" "}
                        <Link href="/privacidad" className="text-violet hover:text-violet/80 underline">
                          política de privacidad
                        </Link>
                        *
                      </Label>
                      {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="newsletter"
                      checked={formData.acceptNewsletter}
                      onCheckedChange={(checked) => handleInputChange("acceptNewsletter", checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="newsletter" className="text-sm text-gray-700 cursor-pointer">
                      Quiero recibir noticias y promociones de Diamond's Academy
                    </Label>
                  </div>
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
                      Creando cuenta...
                    </>
                  ) : (
                    <>
                      Crear Cuenta
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="text-center pt-6">
              <div className="w-full">
                <div className="text-sm text-gray-600">
                  ¿Ya tienes una cuenta?{" "}
                  <Link href="/login" className="text-violet hover:text-violet/80 font-semibold transition-colors">
                    Inicia sesión aquí
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
        </div>
      </div>
    </div>
  )
}
