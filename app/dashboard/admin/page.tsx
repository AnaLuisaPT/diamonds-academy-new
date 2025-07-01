// app/dashboard/admin/page.tsx
import { listInscripciones, InscripcionDTO } from "@/lib/api";
import DashboardNav from "@/components/admin/DashboardNav";
import PendingTab from "@/components/admin/PendingTab";
import UsersTab from "@/components/admin/UsersTab";
import AddUserTab from "@/components/admin/AddUserTab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminPageProps {
  searchParams: { tab?: string };
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab: rawTab } = await searchParams;
  const currentTab = rawTab ?? "pending";

  let pendingInscriptions: InscripcionDTO[] = [];
  if (currentTab === "pending") {
    try {
      pendingInscriptions = await listInscripciones("pending");
    } catch {
      pendingInscriptions = [];
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Panel de Administrador</h1>

        <DashboardNav
          activeTab={currentTab}
          pendingCount={pendingInscriptions.length}
        />

        <div className="mt-8 space-y-6">
          {currentTab === "pending" && <PendingTab inscriptions={pendingInscriptions} />}
          {currentTab === "users"   && <UsersTab />}
          {currentTab === "add"     && <AddUserTab />}
          {currentTab === "overview" && (
            <Card>
              <CardHeader>
                <CardTitle>Resumen General</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Bienvenido al panel de administrador.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
