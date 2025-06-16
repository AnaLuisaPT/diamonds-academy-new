"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, UserPlus, Settings, Shield, GraduationCap, User } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const pendingUsers = [
    { id: 1, name: "María García", email: "maria@email.com", type: "instructor", status: "pending" },
    { id: 2, name: "Juan Pérez", email: "juan@email.com", type: "alumno", status: "pending" },
  ]

  const allUsers = [
    { id: 1, name: "Ana López", email: "ana@email.com", type: "instructor", status: "active", level: "Avanzado" },
    { id: 2, name: "Carlos Ruiz", email: "carlos@email.com", type: "alumno", status: "active", level: "Intermedio" },
    { id: 3, name: "Sofia Martín", email: "sofia@email.com", type: "alumno", status: "active", level: "Principiante" },
  ]

  const approveUser = (userId: number) => {
    alert(`Usuario ${userId} aprobado`)
  }

  const rejectUser = (userId: number) => {
    alert(`Usuario ${userId} rechazado`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-violet" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Administrador</h1>
                <p className="text-gray-600">Diamond's Academy</p>
              </div>
            </div>
            <Button variant="outline">Cerrar Sesión</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => setActiveTab("overview")}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Resumen
          </Button>
          <Button
            variant={activeTab === "users" ? "default" : "outline"}
            onClick={() => setActiveTab("users")}
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Gestión de Usuarios
          </Button>
          <Button
            variant={activeTab === "pending" ? "default" : "outline"}
            onClick={() => setActiveTab("pending")}
            className="flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Solicitudes Pendientes
            {pendingUsers.length > 0 && (
              <Badge variant="destructive" className="ml-1">
                {pendingUsers.length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Instructores</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Activos</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alumnos</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">Activos</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Solicitudes</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingUsers.length}</div>
                <p className="text-xs text-muted-foreground">Pendientes</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Management Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>Administra todos los usuarios del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {user.type === "instructor" ? (
                          <GraduationCap className="w-8 h-8 text-violet" />
                        ) : (
                          <User className="w-8 h-8 text-turquoise" />
                        )}
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant={user.type === "instructor" ? "default" : "secondary"}>{user.type}</Badge>
                            {user.level && <Badge variant="outline">{user.level}</Badge>}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Select defaultValue={user.level || ""}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Nivel" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Principiante">Principiante</SelectItem>
                            <SelectItem value="Intermedio">Intermedio</SelectItem>
                            <SelectItem value="Avanzado">Avanzado</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pending Requests Tab */}
        {activeTab === "pending" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Solicitudes Pendientes</CardTitle>
                <CardDescription>Revisa y aprueba nuevos usuarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                      <div className="flex items-center gap-4">
                        {user.type === "instructor" ? (
                          <GraduationCap className="w-8 h-8 text-violet" />
                        ) : (
                          <User className="w-8 h-8 text-turquoise" />
                        )}
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <Badge variant="outline" className="mt-1">
                            {user.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => approveUser(user.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Aprobar
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => rejectUser(user.id)}>
                          Rechazar
                        </Button>
                      </div>
                    </div>
                  ))}
                  {pendingUsers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No hay solicitudes pendientes</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
