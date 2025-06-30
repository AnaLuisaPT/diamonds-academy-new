"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GradesTabProps {
  students: { id: string; name: string; class: string; attendance: number; grade: number }[];
}

export function GradesTab({ students }: GradesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Calificaciones</CardTitle>
        <CardDescription>Asigna y actualiza las calificaciones de tus estudiantes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.class}</p>
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
  );
}
