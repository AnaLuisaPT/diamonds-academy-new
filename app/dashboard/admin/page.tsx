import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import DashboardNav from "@/components/admin/DashboardNav";
import PendingTab from "@/components/admin/PendingTab";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface InscriptionData {
    id: number; status: 'pending' | 'active'; submittedAt: string;
    studentName: string; studentAge: string; parentName: string;
    email: string; phone: string; classType: string; experience: string;
    schedule: string; medicalInfo: string; comments: string;
}

async function approveInscription(id: number) {
    "use server"
    const pendingPath = path.join(process.cwd(), 'data/pending-inscriptions.json');
    const activePath = path.join(process.cwd(), 'data/active-users.json');

    const pendingData = await fs.readFile(pendingPath, 'utf-8');
    const activeData = await fs.readFile(activePath, 'utf-8');
    let pendingInscriptions: InscriptionData[] = JSON.parse(pendingData);
    let activeUsers: InscriptionData[] = JSON.parse(activeData);

    const inscriptionToApprove = pendingInscriptions.find(insc => insc.id === id);
    if (!inscriptionToApprove) return;

    inscriptionToApprove.status = 'active';
    activeUsers.push(inscriptionToApprove);
    const updatedPending = pendingInscriptions.filter(insc => insc.id !== id);

    await fs.writeFile(pendingPath, JSON.stringify(updatedPending, null, 2));
    await fs.writeFile(activePath, JSON.stringify(activeUsers, null, 2));

    revalidatePath('/dashboard/admin'); // Actualizamos a la ruta correcta
}

async function rejectInscription(id: number) {
    "use server"
    const pendingPath = path.join(process.cwd(), 'data/pending-inscriptions.json');
    const pendingData = await fs.readFile(pendingPath, 'utf-8');
    let pendingInscriptions: InscriptionData[] = JSON.parse(pendingData);
    const updatedPending = pendingInscriptions.filter(insc => insc.id !== id);
    await fs.writeFile(pendingPath, JSON.stringify(updatedPending, null, 2));
    revalidatePath('/dashboard/admin'); // Actualizamos a la ruta correcta
}

export default async function AdminPage({ searchParams }: { searchParams: { tab?: string } }) {
    const pendingPath = path.join(process.cwd(), 'data/pending-inscriptions.json');
    const activePath = path.join(process.cwd(), 'data/active-users.json');

    let pendingInscriptions: InscriptionData[] = [];
    let activeUsers: InscriptionData[] = [];
    try {
        pendingInscriptions = JSON.parse(await fs.readFile(pendingPath, 'utf-8'));
    } catch (e) { console.log("No se encontró pending-inscriptions.json"); }
    try {
        activeUsers = JSON.parse(await fs.readFile(activePath, 'utf-8'));
    } catch (e) { console.log("No se encontró active-users.json"); }
    
    const currentTab = searchParams.tab || 'overview';

    return (
        // (MODIFICACIÓN APLICADA AQUÍ)
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
                          <CardHeader><CardTitle>Usuarios Activos ({activeUsers.length})</CardTitle></CardHeader>
                          <CardContent>
                            <p>Aquí se mostrará la lista de usuarios activos.</p>
                          </CardContent>
                        </Card>
                    )}
                     {currentTab === 'overview' && (
                        <Card>
                          <CardHeader><CardTitle>Resumen General</CardTitle></CardHeader>
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