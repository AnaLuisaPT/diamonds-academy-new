"use client"

import type { InscriptionData } from "@/app/dashboard/admin/page"; // Asegúrate que la ruta de importación sea correcta
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "../ui/badge";

// Componente para mostrar un detalle específico en el modal
const DetailItem = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-base text-gray-900">{value || "No especificado"}</p>
  </div>
);

export default function PendingTab({ inscriptions, onApprove, onReject }: any) { // 'any' para evitar errores de tipo con las Server Actions
  
  const handleApproveClick = (inscription: InscriptionData) => {
    toast.promise(onApprove(inscription.id), {
      loading: `Aprobando a ${inscription.studentName}...`,
      success: `${inscription.studentName} ha sido aprobado/a.`,
      error: 'Error al aprobar la inscripción.',
    });
  };

  const handleRejectClick = (inscription: InscriptionData) => {
     toast.promise(onReject(inscription.id), {
      loading: `Rechazando a ${inscription.studentName}...`,
      success: `La solicitud de ${inscription.studentName} ha sido rechazada.`,
      error: 'Error al rechazar la inscripción.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solicitudes de Inscripción Pendientes</CardTitle>
        <CardDescription>Revisa, aprueba o rechaza las nuevas solicitudes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inscriptions.length > 0 ? (
            inscriptions.map((insc: InscriptionData) => (
              <Dialog key={insc.id}>
                <div className="flex flex-wrap items-center justify-between p-4 border rounded-lg bg-yellow-50/50">
                  <div className="flex-1 min-w-[250px] mb-4 md:mb-0">
                    <p className="font-bold text-violet-700">{insc.studentName}</p>
                    <p className="text-sm text-gray-600">{insc.email}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary">Clase: {insc.classType}</Badge>
                      <Badge variant="secondary">Edad: {insc.studentAge}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Ver Detalles</Button>
                    </DialogTrigger>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleApproveClick(insc)}>
                      Aprobar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleRejectClick(insc)}>
                      Rechazar
                    </Button>
                  </div>
                </div>

                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Detalles de la Inscripción</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 py-4">
                    <DetailItem label="Nombre del Estudiante" value={insc.studentName} />
                    <DetailItem label="Edad" value={insc.studentAge} />
                    <DetailItem label="Nombre del Apoderado" value={insc.parentName} />
                    <DetailItem label="Teléfono de Contacto" value={insc.phone} />
                    <DetailItem label="Correo Electrónico" value={insc.email} />
                    <DetailItem label="Clase Solicitada" value={insc.classType} />
                    <DetailItem label="Experiencia Previa" value={insc.experience} />
                    <DetailItem label="Preferencia de Horario" value={insc.schedule} />
                    <div className="md:col-span-2">
                       <DetailItem label="Información Médica" value={insc.medicalInfo} />
                    </div>
                    <div className="md:col-span-2">
                      <DetailItem label="Comentarios Adicionales" value={insc.comments} />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              ¡Felicidades! No hay solicitudes pendientes.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}