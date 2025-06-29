"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export interface InscriptionData {
  id: number;
  status: "pending" | "active";
  submittedAt: string;
  studentName: string;
  studentAge: string;
  parentName: string;
  email: string;
  phone: string;
  classType: string;
  experience: string;
  schedule: string;
  medicalInfo: string;
  comments: string;
}

const PENDING_FILE = path.join(process.cwd(), "data/pending-inscriptions.json");
const ACTIVE_FILE  = path.join(process.cwd(), "data/active-users.json");

function normalizeId(id: string | number): number {
  return typeof id === "string" ? parseInt(id, 10) : id;
}

/**
 * Envía una nueva inscripción a la lista de pendientes.
 */
export async function submitInscription(
  formData: Omit<InscriptionData, "id" | "status" | "submittedAt">
): Promise<{ success: boolean; message: string }> {
  let pending: InscriptionData[] = [];
  try {
    pending = JSON.parse(await fs.readFile(PENDING_FILE, "utf-8"));
  } catch {
    pending = [];
  }

  const newInsc: InscriptionData = {
    ...formData,
    id: Date.now(),
    status: "pending",
    submittedAt: new Date().toISOString(),
  };
  pending.push(newInsc);

  await fs.writeFile(PENDING_FILE, JSON.stringify(pending, null, 2), "utf-8");
  revalidatePath("/dashboard/admin");
  return { success: true, message: "Inscripción enviada." };
}

/**
 * Aprueba una inscripción: la mueve de pendientes a activas.
 */
export async function approveInscription(
  idParam: string | number
): Promise<{ success: boolean; message: string }> {
  const id = normalizeId(idParam);

  const [pending, active]: [InscriptionData[], InscriptionData[]] = await Promise.all([
    fs
      .readFile(PENDING_FILE, "utf-8")
      .then(txt => JSON.parse(txt) as InscriptionData[])
      .catch(() => [] as InscriptionData[]),
    fs
      .readFile(ACTIVE_FILE, "utf-8")
      .then(txt => JSON.parse(txt) as InscriptionData[])
      .catch(() => [] as InscriptionData[]),
  ]);

  const insc = pending.find(i => i.id === id);
  if (!insc) {
    return { success: false, message: "Inscripción no encontrada." };
  }
  insc.status = "active";
  active.push(insc);

  const newPending = pending.filter(i => i.id !== id);
  await Promise.all([
    fs.writeFile(ACTIVE_FILE, JSON.stringify(active, null, 2), "utf-8"),
    fs.writeFile(PENDING_FILE, JSON.stringify(newPending, null, 2), "utf-8"),
  ]);

  revalidatePath("/dashboard/admin");
  return { success: true, message: "Inscripción aprobada." };
}

/**
 * Rechaza una inscripción pendiente.
 */
export async function rejectInscription(
  idParam: string | number
): Promise<{ success: boolean; message: string }> {
  const id = normalizeId(idParam);
  let pending: InscriptionData[] = [];
  try {
    pending = JSON.parse(await fs.readFile(PENDING_FILE, "utf-8"));
  } catch {
    pending = [];
  }
  const newPending = pending.filter(i => i.id !== id);
  await fs.writeFile(PENDING_FILE, JSON.stringify(newPending, null, 2), "utf-8");
  revalidatePath("/dashboard/admin");
  return { success: true, message: "Inscripción rechazada." };
}
