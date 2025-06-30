"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface MaterialsTabProps {
  classes: { id: string; name: string }[];
}

export function MaterialsTab({ classes }: MaterialsTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subir Material Académico</CardTitle>
          <CardDescription>Comparte recursos con tus estudiantes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="input-title">Título del Material</Label>
              <Input id="input-title" placeholder="Ej: Técnicas de Ballet Clásico" />
            </div>
            <div>
              <Label htmlFor="textarea-desc">Descripción</Label>
              <Textarea id="textarea-desc" placeholder="Describe el contenido del material..." />
            </div>
            <div>
              <Label htmlFor="select-material-class" id="label-select-material-class">Clase</Label>
              <select
                id="select-material-class"
                className="w-full p-2 border rounded"
                aria-labelledby="label-select-material-class"
                title="Clase"
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
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
            {/* Aquí iría un mapeo de materiales reales */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
