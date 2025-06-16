"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, BookOpen, ClipboardCheck, Star, Download, Calendar } from "lucide-react"

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const studentInfo = {
    name: "Sofia Martín",
    class: "Ballet Juvenil",
    level: "Intermedio",
    instructor: "Profesora Ana Martínez",
    attendance: 85,
    grade: 8.5,
  }

  const materials = [
    { id: 1, title: "Posiciones Básicas de Ballet", type: "PDF", uploadDate: "2024-01-15", instructor: "Ana Martínez" },
    { id: 2, title: "Ejercicios de Barra", type: "Video", uploadDate: "2024-01-10", instructor: "Ana Martínez" },
    { id: 3, title: "Técnicas de Salto", type: "PDF", uploadDate: "2024-01-05", instructor: "Ana Martínez" },
  ]

  const attendanceHistory = [
    { date: "2024-01-15", status: "Presente", class: "Ballet Juvenil" },
    { date: "2024-01-13", status: "Presente", class: "Ballet Juvenil" },
    { date: "2024-01-10", status: "Ausente", class: "Ballet Juvenil" },
    { date: "2024-01-08", status: "Presente", class: "Ballet Juvenil" },
    { date: "2024-01-06", status: "Presente", class: "Ballet Juvenil" },
  ]

  const grades = [
    { subject: "Técnica", grade: 8.5, maxGrade: 10 },
    { subject: "Expresión Artística", grade: 9.0, maxGrade: 10 },
    { subject: "Disciplina", grade: 8.8, maxGrade: 10 },
    { subject: "Participación", grade: 8.2, maxGrade: 10 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-turquoise" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi Panel de Estudiante</h1>
                <p className="text-gray-600">
                  {studentInfo.name} - {studentInfo.class}
                </p>
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
            Mi Asistencia
          </Button>
          <Button
            variant={activeTab === "materials" ? "default" : "outline"}
            onClick={() => setActiveTab("materials")}
            className="flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Material de Estudio
          </Button>
          <Button
            variant={activeTab === "grades" ? "default" : "outline"}
            onClick={() => setActiveTab("grades")}
            className="flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            Mis Calificaciones
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mi Clase</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-violet">{studentInfo.class}</div>
                  <p className="text-sm text-gray-600">{studentInfo.level}</p>
                  <Badge variant="outline" className="mt-2">
                    {studentInfo.instructor}
                  </Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Asistencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-turquoise">{studentInfo.attendance}%</div>
                  <Progress value={studentInfo.attendance} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Calificación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{studentInfo.grade}/10</div>
                  <Progress value={studentInfo.grade * 10} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Material</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{materials.length}</div>
                  <p className="text-sm text-gray-600">Recursos disponibles</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Nombre Completo</Label>
                    <p className="text-gray-700">{studentInfo.name}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Clase Actual</Label>
                    <p className="text-gray-700">{studentInfo.class}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Nivel</Label>
                    <p className="text-gray-700">{studentInfo.level}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Instructor</Label>
                    <p className="text-gray-700">{studentInfo.instructor}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <Card>
            <CardHeader>
              <CardTitle>Mi Historial de Asistencia</CardTitle>
              <CardDescription>Revisa tu asistencia a las clases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-turquoise">{studentInfo.attendance}%</div>
                    <p className="text-sm text-gray-600">Asistencia General</p>
                  </div>
                  <Progress value={studentInfo.attendance} className="flex-1" />
                </div>
              </div>

              <div className="space-y-3">
                {attendanceHistory.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{record.date}</p>
                        <p className="text-sm text-gray-600">{record.class}</p>
                      </div>
                    </div>
                    <Badge
                      variant={record.status === "Presente" ? "default" : "destructive"}
                      className={record.status === "Presente" ? "bg-green-600" : ""}
                    >
                      {record.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Materials Tab */}
        {activeTab === "materials" && (
          <Card>
            <CardHeader>
              <CardTitle>Material de Estudio</CardTitle>
              <CardDescription>Accede a los recursos compartidos por tu instructor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <BookOpen className="w-8 h-8 text-violet" />
                      <div>
                        <h3 className="font-semibold">{material.title}</h3>
                        <p className="text-sm text-gray-600">
                          Por {material.instructor} • {material.uploadDate}
                        </p>
                        <Badge variant="outline">{material.type}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Descargar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grades Tab */}
        {activeTab === "grades" && (
          <Card>
            <CardHeader>
              <CardTitle>Mis Calificaciones</CardTitle>
              <CardDescription>Revisa tu progreso académico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{studentInfo.grade}/10</div>
                  <p className="text-gray-600">Promedio General</p>
                </div>

                <div className="space-y-4">
                  {grades.map((grade, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{grade.subject}</span>
                        <span className="font-bold">
                          {grade.grade}/{grade.maxGrade}
                        </span>
                      </div>
                      <Progress value={(grade.grade / grade.maxGrade) * 100} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
