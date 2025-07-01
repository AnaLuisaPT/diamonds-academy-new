"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OverviewTabProps {
  classes: { id: string; name: string; students: number; schedule: string }[];
  students: { id: string; name: string; class: string; attendance: number; grade: number }[];
}

export function OverviewTab({ classes, students }: OverviewTabProps) {
  const totalStudents = students.length;
  const avgGrade = (
    students.reduce((sum, s) => sum + s.grade, 0) / (students.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-6 pt-20">
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
            <div className="text-3xl font-bold text-turquoise">{totalStudents}</div>
            <p className="text-sm text-gray-600">Estudiantes activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Promedio General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{avgGrade}</div>
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
              <div
                key={cls.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{cls.name}</h3>
                  <p className="text-sm text-gray-600">{cls.schedule}</p>
                  <Badge variant="outline">{cls.students} estudiantes</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
