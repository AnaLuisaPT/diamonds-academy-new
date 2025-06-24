"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/actions/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData(event.currentTarget);
      const result = await login(formData);

      if (result.success) {
        toast.success('¡Bienvenido/a de vuelta!');
        // Usamos un replace para que el usuario no pueda volver a la página de login con el botón de "atrás"
        router.replace('/dashboard/admin');
      } else {
        setError(result.error || 'Ocurrió un error inesperado.');
        toast.error(result.error || 'Ocurrió un error inesperado.');
      }
    } catch (e) {
      setError('No se pudo conectar con el servidor.');
      toast.error('No se pudo conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // (ESTILO) Añadimos el fondo degradado y centramos todo verticalmente
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
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Correo Electrónico</Label>
              {/* (ESTILO) Personalizamos el input para que el foco sea del color de la marca */}
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="admin@diamante.com" 
                required 
                className="h-12 focus-visible:ring-violet-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="h-12 focus-visible:ring-violet-500"
              />
            </div>
            {error && <p className="text-sm font-medium text-red-500 text-center">{error}</p>}
            <div className="pt-2">
               {/* (ESTILO) Aplicamos tu botón de gradiente personalizado */}
              <Button 
                type="submit" 
                className="w-full h-12 text-lg text-white font-semibold rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? 'Verificando...' : 'Ingresar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}