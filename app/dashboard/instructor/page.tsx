"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { listUsers, listNiveles } from "@/lib/api";
import DashboardNavInstructor from "@/components/instructor/DashboardNavIns";
import { OverviewTab } from "@/components/instructor/OverviewTab";
import { AttendanceTab } from "@/components/instructor/AttendanceTab";
import { MaterialsTab } from "@/components/instructor/MaterialsTab";
import { GradesTab } from "@/components/instructor/GradesTab";

export default function InstructorDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Carga datos una vez que usuario se conoce
  useEffect(() => {
    if (!authLoading) {
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
  }, [authLoading]);


  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Barra de navegación */}
      <DashboardNavInstructor
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <p>Cargando datos...</p>
        ) : (
          <>
            {activeTab === "overview" && (
              <OverviewTab classes={classes} students={students} />
            )}
            {activeTab === "attendance" && (
              <AttendanceTab classes={classes} students={students} />
            )}
            {activeTab === "materials" && <MaterialsTab classes={classes} />}
            {activeTab === "grades" && <GradesTab students={students} />}
          </>
        )}
      </div>
    </div>
  );
}
