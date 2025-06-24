"use server"

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const pendingFilePath = path.join(process.cwd(), 'data/pending-inscriptions.json');

interface FormData {
    studentName: string; studentAge: string; parentName: string;
    email: string; phone: string; classType: string;
    experience: string; schedule: string; medicalInfo: string; comments: string;
}

export async function submitInscription(formData: FormData) {
    try {
        let pendingInscriptions = [];
        try {
            const fileData = await fs.readFile(pendingFilePath, 'utf-8');
            pendingInscriptions = JSON.parse(fileData);
        } catch (error) {
            console.log("pending-inscriptions.json no encontrado, se creará uno nuevo.");
        }

        const newInscription = {
            id: Date.now(),
            status: "pending" as const,
            submittedAt: new Date().toISOString(),
            ...formData,
        };

        pendingInscriptions.push(newInscription);
        await fs.writeFile(pendingFilePath, JSON.stringify(pendingInscriptions, null, 2));
        
        revalidatePath('/admin');

        return { success: true, message: "Inscripción enviada con éxito." };

    } catch (error) {
        console.error("Error al procesar la inscripción:", error);
        return { success: false, message: "Ocurrió un error en el servidor." };
    }
}