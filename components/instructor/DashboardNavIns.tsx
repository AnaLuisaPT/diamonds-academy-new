"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, ClipboardCheck, FileText, Star } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

interface DashboardNavInstructorProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function DashboardNavInstructor({ activeTab, onTabChange }: DashboardNavInstructorProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-violet" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de Instructor</h1>
            <p className="text-gray-600 capitalize">
              {user?.rol || 'Instructor'}: {user?.nombre || 'Usuario'}
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={logout}>
          Cerrar Sesión
        </Button>
      </div>
      <nav className="max-w-7xl mx-auto px-4 py-2 flex gap-4">
        <Button
          variant={activeTab === "overview" ? "default" : "outline"}
          onClick={() => onTabChange("overview")}
          className="flex items-center gap-2"
        >
          <GraduationCap className="w-4 h-4" />
          Resumen
        </Button>
        <Button
          variant={activeTab === "attendance" ? "default" : "outline"}
          onClick={() => onTabChange("attendance")}
          className="flex items-center gap-2"
        >
          <ClipboardCheck className="w-4 h-4" />
          Asistencia
        </Button>
        <Button
          variant={activeTab === "materials" ? "default" : "outline"}
          onClick={() => onTabChange("materials")}
          className="flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Material Académico
        </Button>
        <Button
          variant={activeTab === "grades" ? "default" : "outline"}
          onClick={() => onTabChange("grades")}
          className="flex items-center gap-2"
        >
          <Star className="w-4 h-4" />
          Calificaciones
        </Button>
      </nav>
    </header>
  );
}
