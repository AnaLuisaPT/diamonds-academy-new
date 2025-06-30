"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface AttendanceTabProps {
  classes: { id: string; name: string }[];
  students: { id: string; name: string; class: string; attendance: number }[];
}

export function AttendanceTab({ classes, students }: AttendanceTabProps) {
  const [selectedClass, setSelectedClass] = useState<string>(classes[0]?.id ?? "");
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [marks, setMarks] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string) => {
    setMarks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tomar Asistencia</CardTitle>
        <CardDescription>Marca la asistencia de tus estudiantes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="select-class">Clase</Label>
              <select
                id="select-class"
                aria-label="Clase"
                className="w-full p-2 border rounded"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="input-date">Fecha</Label>
              <Input
                id="input-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            {students
              .filter((s) => s.class === classes.find((c) => c.id === selectedClass)?.name)
              .map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 border rounded"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`student-${student.id}`}
                      checked={!!marks[student.id]}
                      onCheckedChange={() => handleToggle(student.id)}
                    />
                    <label htmlFor={`student-${student.id}`} className="font-medium">
                      {student.name}
                    </label>
                  </div>
                  <div className="text-sm text-gray-600">
                    Asistencia: {student.attendance}%
                  </div>
                </div>
              ))}
          </div>

          <Button className="w-full bg-gradient-to-r from-turquoise to-violet">
            Guardar Asistencia
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}