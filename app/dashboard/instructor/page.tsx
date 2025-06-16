"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap, FileText, ClipboardCheck, Upload, Star } from "lucide-react"

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const students = [
    { id: 1, name: "Ana López", class: "Ballet Juvenil", attendance: 85, grade: 9.2 },
    { id: 2, name: "Carlos Ruiz", class: "Ballet Formativo", attendance: 92, grade: 8.8 },
    { id: 3, name: "Sofia Martín", class: "Ballet Juvenil", attendance: 78, grade: 8.5 },
  ]

  const classes = [
    { id: 1, name: "Ballet Juvenil", students: 12, schedule: "Lunes y Miércoles 16:00" },
    { id: 2, name: "Ballet Formativo", students: 8, schedule: "Martes y Jueves 17:00" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-violet" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Instructor</h1>
                <p className="text-gray-600">Profesora Ana Martínez</p>
              </div>
            </div>
            <Button variant="outline">Cerrar Sesión</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <Button variant={activeTab === "overview" ? "default" : "outline"} onClick={() => setActiveTab("overview")}>
            Resumen
          </Button>
          <Button
            variant={activeTab === "attendance" ? "default" : "outline"}
            onClick={() => setActiveTab("attendance")}
            className="flex items-center gap-2"
          >
            <ClipboardCheck className="w-4 h-4" />
            Asistencia
          </Button>
          <Button
            variant={activeTab === "materials" ? "default" : "outline"}
            onClick={() => setActiveTab("materials")}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Material Académico
          </Button>
          <Button
            variant={activeTab === "grades" ? "default" : "outline"}
            onClick={() => setActiveTab("grades")}
            className="flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            Calificaciones
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mis Clases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-violet">{classes.length}</div>
                  <p className="text-sm text-gray-600">Clases asignadas</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Estudiantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-turquoise">
                    {classes.reduce((sum, cls) => sum + cls.students, 0)}
                  </div>
                  <p className="text-sm text-gray-600">Estudiantes activos</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Promedio General</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">8.8</div>
                  <p className="text-sm text-gray-600">Calificación promedio</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Mis Clases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classes.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{cls.name}</h3>
                        <p className="text-sm text-gray-600">{cls.schedule}</p>
                        <Badge variant="outline">{cls.students} estudiantes</Badge>
                      </div>
                      <Button variant="outline">Ver Detalles</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <Card>
            <CardHeader>
              <CardTitle>Tomar Asistencia</CardTitle>
              <CardDescription>Marca la asistencia de tus estudiantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 mb-6">
                  <div>
                    <Label>Clase</Label>
                    <select className="w-full p-2 border rounded">
                      <option>Ballet Juvenil</option>
                      <option>Ballet Formativo</option>
                    </select>
                  </div>
                  <div>
                    <Label>Fecha</Label>
                    <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                  </div>
                </div>

                <div className="space-y-3">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <Checkbox id={`student-${student.id}`} />
                        <label htmlFor={`student-${student.id}`} className="font-medium">
                          {student.name}
                        </label>
                        <Badge variant="outline">{student.class}</Badge>
                      </div>
                      <div className="text-sm text-gray-600">Asistencia: {student.attendance}%</div>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-turquoise to-violet">Guardar Asistencia</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Materials Tab */}
        {activeTab === "materials" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subir Material Académico</CardTitle>
                <CardDescription>Comparte recursos con tus estudiantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Título del Material</Label>
                    <Input placeholder="Ej: Técnicas de Ballet Clásico" />
                  </div>
                  <div>
                    <Label>Descripción</Label>
                    <Textarea placeholder="Describe el contenido del material..." />
                  </div>
                  <div>
                    <Label>Clase</Label>
                    <select className="w-full p-2 border rounded">
                      <option>Seleccionar clase</option>
                      <option>Ballet Juvenil</option>
                      <option>Ballet Formativo</option>
                    </select>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Arrastra archivos aquí o haz clic para seleccionar</p>
                    <Button variant="outline" className="mt-4">
                      Seleccionar Archivos
                    </Button>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-turquoise to-violet">Subir Material</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Material Subido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">Posiciones Básicas de Ballet</h4>
                      <p className="text-sm text-gray-600">Ballet Juvenil • Subido hace 2 días</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">Ejercicios de Barra</h4>
                      <p className="text-sm text-gray-600">Ballet Formativo • Subido hace 1 semana</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Grades Tab */}
        {activeTab === "grades" && (
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Calificaciones</CardTitle>
              <CardDescription>Asigna y actualiza las calificaciones de tus estudiantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.class}</p>
                      <Badge variant="outline">Asistencia: {student.attendance}%</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <Label className="text-sm">Calificación</Label>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          defaultValue={student.grade}
                          className="w-20"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        Actualizar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
