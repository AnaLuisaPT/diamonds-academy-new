"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { approveInscripcion, InscripcionDTO, rejectInscripcion } from "@/lib/api";

interface PendingTabProps {
  inscriptions: InscripcionDTO[];
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

export default function PendingTab({ inscriptions }: PendingTabProps) {
  const router = useRouter();

  // Estado local con la lista inicial
  const [list, setList] = useState<InscripcionDTO[]>(inscriptions);

  const handleApprove = async (insc: InscripcionDTO) => {
    await toast.promise(approveInscripcion(insc.id), {
      loading: `Aprobando ${insc.studentName}…`,
      success: `¡${insc.studentName} aprobado!`,
      error: `Error al aprobar.`,
    });
    setList((prev) => prev.filter((i) => i.id !== insc.id));
    router.refresh();
  };

  const handleReject = async (insc: InscripcionDTO) => {
    await toast.promise(rejectInscripcion(insc.id), {
      loading: `Eliminando ${insc.studentName}…`,
      success: `Inscripción de ${insc.studentName} eliminada.`,
      error: `Error al eliminar.`,
    });
    // Eliminamos de la lista local
    setList((prev) => prev.filter((i) => i.id !== insc.id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inscripciones Pendientes</CardTitle>
        <CardDescription>Aprueba o rechaza las solicitudes.</CardDescription>
      </CardHeader>
      <CardContent>
        {list.length > 0 ? (
          <div className="space-y-4">
            {list.map((insc) => {
              const descId = `insc-desc-${insc.id}`;
              return (
                <Dialog key={insc.id}>
                  <div className="flex justify-between p-4 border rounded-lg bg-yellow-50/50">
                    <div>
                      <p className="font-bold text-violet-700">
                        {insc.studentName}
                      </p>
                      <p className="text-sm text-gray-600">{insc.email}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary">
                          Clase: {insc.classType}
                        </Badge>
                        <Badge variant="secondary">
                          Edad: {insc.studentAge}
                        </Badge>
                      </div>
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

                  <DialogContent
                    className="max-w-2xl bg-white"
                    aria-describedby={descId}
                  >
                    <DialogHeader>
                      <DialogTitle>Detalles de la Inscripción</DialogTitle>
                      <DialogDescription id={descId}>
                        Revisa toda la información antes de continuar.
                      </DialogDescription>
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
              );
            })}
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
