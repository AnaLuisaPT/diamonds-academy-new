"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Mail, ArrowRight, Sparkles, KeyRound, CheckCircle, ArrowLeft } from "lucide-react"

export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError("El correo electrónico es requerido")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor ingresa un correo válido")
      return
    }

    setIsLoading(true)

    // Simulación de envío de email
    setTimeout(() => {
      setEmailSent(true)
      setIsLoading(false)
    }, 2000)
  }

  if (emailSent) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-bg opacity-90"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Elementos decorativos */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float"></div>

        <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/95 text-center">
              <CardHeader className="pb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold gradient-text">¡Email Enviado!</CardTitle>
                <CardDescription className="text-base">Revisa tu bandeja de entrada</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-turquoise/10 to-violet/10 rounded-2xl p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Hemos enviado las instrucciones para restablecer tu contraseña a:
                  </p>
                  <p className="font-semibold text-violet text-lg">{email}</p>
                </div>

                <div className="text-left space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-violet/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet font-bold text-xs">1</span>
                    </div>
                    <p>Revisa tu bandeja de entrada (y spam)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-violet/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet font-bold text-xs">2</span>
                    </div>
                    <p>Haz clic en el enlace del email</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-violet/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet font-bold text-xs">3</span>
                    </div>
                    <p>Crea tu nueva contraseña</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => setEmailSent(false)}
                    variant="outline"
                    className="w-full mb-4 border-violet text-violet hover:bg-violet hover:text-white"
                  >
                    Enviar a otro correo
                  </Button>
                  <Link href="/login">
                    <Button className="w-full bg-gradient-to-r from-turquoise to-violet hover:from-turquoise/90 hover:to-violet/90">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Volver al Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Ayuda adicional */}
            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg text-center">
              <p className="text-white/80 text-sm mb-2">
                <strong>¿No recibiste el email?</strong>
              </p>
              <div className="text-white/70 text-xs space-y-1">
                <div>• Revisa tu carpeta de spam</div>
                <div>• Verifica que el correo esté bien escrito</div>
                <div>• Contacta soporte: diamondsacademy.cl@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-90"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Diamond's Academy</h1>
            <p className="text-white/80 text-lg">Recupera tu contraseña</p>
          </div>

          {/* Card principal */}
          <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <KeyRound className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold gradient-text">¿Olvidaste tu contraseña?</CardTitle>
              <CardDescription className="text-base">No te preocupes, te ayudamos a recuperarla</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gradient-to-r from-turquoise/10 to-violet/10 rounded-2xl p-4 mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                  </p>
                </div>

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
                      className={`h-12 pl-10 ${error ? "border-red-500" : "border-gray-300"} focus:border-violet transition-all duration-300`}
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-turquoise to-violet hover:from-turquoise/90 hover:to-violet/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Instrucciones
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="text-center pt-6">
              <div className="w-full">
                <div className="text-sm text-gray-600">
                  ¿Recordaste tu contraseña?{" "}
                  <Link href="/login" className="text-violet hover:text-violet/80 font-semibold transition-colors">
                    Inicia sesión
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

          {/* Información de contacto */}
          <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg text-center">
            <p className="text-white/80 text-sm mb-2">
              <strong>¿Necesitas ayuda?</strong>
            </p>
            <div className="text-white/70 text-xs space-y-1">
              <div>📧 diamondsacademy.cl@gmail.com</div>
              <div>📱 +56 9 4542 1629</div>
              <div>🕒 Lun-Vie: 15:00-21:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
