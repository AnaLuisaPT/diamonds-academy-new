"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { listUsers, listNiveles } from "@/lib/api";
import DashboardNavInstructor from "@/components/instructor/DashboardNavIns";
import { OverviewTab } from "@/components/instructor/OverviewTab";
import { AttendanceTab } from "@/components/instructor/AttendanceTab";
import { MaterialsTab } from "@/components/instructor/MaterialsTab";
import { GradesTab } from "@/components/instructor/GradesTab";
import ClassTab from "@/components/instructor/ClassTab";

export default function InstructorDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Redirigir al login si no está autenticado
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  // Carga datos una vez usuario existe
  useEffect(() => {
    if (!authLoading && user) {
      (async () => {
        setLoading(true);
        try {
          const alumnos = await listUsers({ role: "alumno" });
          setStudents(alumnos);
          const niveles = await listNiveles();
          setClasses(niveles);
        } catch (error) {
          console.error("Error cargando datos de instructor:", error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [authLoading, user]);

  // Mientras carga o redirige, no renderiza contenido
  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-16"> {/* pt-16 para compensar navbar fijo */}
      {/* Barra de navegación */}
      <DashboardNavInstructor
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <p className="text-center py-8">Cargando datos...</p>
        ) : (
          <div className="space-y-6 pt-24 max-w-7xl mx-auto px-4">
            {activeTab === "overview" && (
              <OverviewTab classes={classes} students={students} />
            )}
            {activeTab === "attendance" && (
              <AttendanceTab classes={classes} students={students} />
            )}
            {activeTab === "materials" && (
              <MaterialsTab classes={classes} />
            )}
            {activeTab === "grades" && (
              <GradesTab students={students} />
            )}
            {activeTab === "classes" && <ClassTab />}
          </div>
        )}
      </div>
    </div>
  );
}
