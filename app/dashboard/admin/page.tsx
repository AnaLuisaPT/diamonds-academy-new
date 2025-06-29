import fs from 'fs/promises';
import path from 'path';
import DashboardNav from '@/components/admin/DashboardNav';
import PendingTab from '@/components/admin/PendingTab';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  approveInscription,
  rejectInscription,
  InscriptionData,
} from '@/app/actions/inscription';

interface AdminPageProps {
  // Next.js passes searchParams as a Promise in Server Components
  searchParams: Promise<{ tab?: string }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  // Await searchParams to comply with Next.js async dynamic API
  const { tab } = await searchParams;
  const currentTab = tab ?? 'overview';

  const pendingPath = path.join(process.cwd(), 'data/pending-inscriptions.json');
  const activePath = path.join(process.cwd(), 'data/active-users.json');

  let pendingInscriptions: InscriptionData[] = [];
  let activeUsers: InscriptionData[] = [];

  try {
    pendingInscriptions = JSON.parse(await fs.readFile(pendingPath, 'utf-8'));
  } catch {
    // No existe todavía el JSON
  }
  try {
    activeUsers = JSON.parse(await fs.readFile(activePath, 'utf-8'));
  } catch {
    // No existe todavía el JSON
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Panel de Administrador</h1>
        <DashboardNav activeTab={currentTab} pendingCount={pendingInscriptions.length} />

        <div className="mt-8">
          {currentTab === 'pending' && (
            <PendingTab
              inscriptions={pendingInscriptions}
              onApprove={approveInscription}
              onReject={rejectInscription}
            />
          )}

          {currentTab === 'users' && (
            <Card>
              <CardHeader>
                <CardTitle>Usuarios Activos ({activeUsers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeUsers.map((user) => (
                    <p key={String(user.id)} className="text-gray-800">
                      {user.studentName} — {user.email}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {currentTab === 'overview' && (
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
