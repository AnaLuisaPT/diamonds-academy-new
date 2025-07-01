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
    <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-violet" />
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Panel de Instructor</h1>
            <p className="text-sm text-gray-600 capitalize">
              {user?.rol || 'instructor'}: {user?.nombre || 'usuario'}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={logout} className="text-sm sm:text-base">
            Cerrar Sesión
          </Button>
        </div>
      </div>
      <nav className="max-w-7xl mx-auto px-4 overflow-x-auto">
        <div className="flex space-x-2 sm:space-x-4 py-2">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => onTabChange("overview")}
            className="flex-none flex items-center gap-1 sm:gap-2 text-sm sm:text-base whitespace-nowrap"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Resumen</span>
          </Button>
          <Button
            variant={activeTab === "attendance" ? "default" : "outline"}
            onClick={() => onTabChange("attendance")}
            className="flex-none flex items-center gap-1 sm:gap-2 text-sm sm:text-base whitespace-nowrap"
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Asistencia</span>
          </Button>
          <Button
            variant={activeTab === "materials" ? "default" : "outline"}
            onClick={() => onTabChange("materials")}
            className="flex-none flex items-center gap-1 sm:gap-2 text-sm sm:text-base whitespace-nowrap"
          >
            <FileText className="w-4 h-4" />
            <span>Material Académico</span>
          </Button>
          <Button
            variant={activeTab === "grades" ? "default" : "outline"}
            onClick={() => onTabChange("grades")}
            className="flex-none flex items-center gap-1 sm:gap-2 text-sm sm:text-base whitespace-nowrap"
          >
            <Star className="w-4 h-4" />
            <span>Calificaciones</span>
          </Button>
          <Button
            variant={activeTab === "classes" ? "default" : "outline"}
            onClick={() => onTabChange("classes")}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Mis Clases
          </Button>


        </div>
      </nav>
    </header>
  );
}
