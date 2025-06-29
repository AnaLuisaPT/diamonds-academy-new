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

const pendingFilePath = path.join(
  process.cwd(),
  "data/pending-inscriptions.json"
);
const activeFilePath = path.join(
  process.cwd(),
  "data/active-users.json"
);

export async function submitInscription(formData: Omit<
  InscriptionData,
  "id" | "status" | "submittedAt"
>) {
  let pending: InscriptionData[] = [];
  try {
    pending = JSON.parse(await fs.readFile(pendingFilePath, "utf-8"));
  } catch {
    pending = [];
  }

  const newInscription: InscriptionData = {
    ...formData,
    id: Date.now(),
    status: "pending",
    submittedAt: new Date().toISOString(),
  };

  pending.push(newInscription);
  await fs.writeFile(
    pendingFilePath,
    JSON.stringify(pending, null, 2),
    "utf-8"
  );
  revalidatePath("/dashboard/admin");
  return { success: true };
}

export async function approveInscription(id: number) {
  const [pending, active]: [InscriptionData[], InscriptionData[]] =
    await Promise.all([
      (async () => {
        try {
          return JSON.parse(
            await fs.readFile(pendingFilePath, "utf-8")
          );
        } catch {
          return [];
        }
      })(),
      (async () => {
        try {
          return JSON.parse(
            await fs.readFile(activeFilePath, "utf-8")
          );
        } catch {
          return [];
        }
      })(),
    ]);

  const insc = pending.find((i) => i.id === id);
  if (!insc) return { success: false, message: "No encontrada" };

  insc.status = "active";
  active.push(insc);
  const newPending = pending.filter((i) => i.id !== id);

  await fs.writeFile(
    activeFilePath,
    JSON.stringify(active, null, 2),
    "utf-8"
  );
  await fs.writeFile(
    pendingFilePath,
    JSON.stringify(newPending, null, 2),
    "utf-8"
  );
  revalidatePath("/dashboard/admin");
  return { success: true };
}

export async function rejectInscription(id: number) {
  let pending: InscriptionData[] = [];
  try {
    pending = JSON.parse(await fs.readFile(pendingFilePath, "utf-8"));
  } catch {
    pending = [];
  }
  const newPending = pending.filter((i) => i.id !== id);
  await fs.writeFile(
    pendingFilePath,
    JSON.stringify(newPending, null, 2),
    "utf-8"
  );
  revalidatePath("/dashboard/admin");
  return { success: true };
}
