// File: components/admin/PendingTab.tsx

"use client";

import { InscriptionData } from "@/app/actions/inscription";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface PendingTabProps {
  inscriptions: InscriptionData[];
  onApprove: (id: string) => Promise<{ success: boolean }>;
  onReject: (id: string) => Promise<{ success: boolean }>;
}

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-base text-gray-900">{value || "No especificado"}</p>
  </div>
);

export default function PendingTab({
  inscriptions,
  onApprove,
  onReject,
}: PendingTabProps) {
  const router = useRouter();

  const handleApprove = async (insc: InscriptionData) => {
    await toast.promise(onApprove(String(insc.id)), {
      loading: `Aprobando ${insc.studentName}...`,
      success: `${insc.studentName} aprobado.`,
      error: `Error al aprobar.`,
    });
    router.refresh();
  };

  const handleReject = async (insc: InscriptionData) => {
    await toast.promise(onReject(String(insc.id)), {
      loading: `Rechazando ${insc.studentName}...`,
      success: `${insc.studentName} rechazado.`,
      error: `Error al rechazar.`,
    });
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inscripciones Pendientes</CardTitle>
        <CardDescription>Aprueba o rechaza las solicitudes.</CardDescription>
      </CardHeader>
      <CardContent>
        {inscriptions.length > 0 ? (
          <div className="space-y-4">
            {inscriptions.map((insc) => (
              <Dialog key={insc.id}>
                <div className="flex justify-between p-4 border rounded-lg bg-yellow-50/50">
                  <div>
                    <p className="font-bold text-violet-700">{insc.studentName}</p>
                    <p className="text-sm text-gray-600">{insc.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </DialogTrigger>
                    <Button
                      size="sm"
                      className="bg-green-600 text-white hover:bg-green-700"
                      onClick={() => handleApprove(insc)}
                    >
                      Aprobar
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-700"
                      onClick={() => handleReject(insc)}
                    >
                      Rechazar
                    </Button>
                  </div>
                </div>

                <DialogContent className="max-w-2xl bg-white">
                  <DialogHeader>
                    <DialogTitle>Detalles de la Inscripción</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <DetailItem label="Nombre" value={insc.studentName} />
                    <DetailItem label="Edad" value={insc.studentAge} />
                    <DetailItem label="Apoderado" value={insc.parentName} />
                    <DetailItem label="Email" value={insc.email} />
                    <DetailItem label="Teléfono" value={insc.phone} />
                    <DetailItem label="Clase" value={insc.classType} />
                    <DetailItem label="Experiencia" value={insc.experience} />
                    <DetailItem label="Horario" value={insc.schedule} />
                    <DetailItem label="Médico" value={insc.medicalInfo} />
                    <DetailItem label="Comentarios" value={insc.comments} />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">
            ¡No hay solicitudes pendientes!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
