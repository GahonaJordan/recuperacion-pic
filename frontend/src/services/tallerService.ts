import { Taller } from "../types/types";
import { fetchAPI } from "./api";

export const tallerService = {

    findAll: async (): Promise<Taller[]> => {
        return await fetchAPI('/taller');
    },

    findById: async (id_taller: number): Promise<Taller> => {
        return await fetchAPI(`/taller/${id_taller}`);
    },

    create: async (data: Partial<Taller>): Promise<Taller> => {
        const { 
            nombre,
            direccion,
            telefono,
            email_contacto,
            horario,
            especialidad,
            servicios,
            reportes
         } = data;
        return await fetchAPI('/taller', {
            method: 'POST',
            body: JSON.stringify({ 
                nombre,
                direccion,
                telefono,
                email_contacto,
                horario,
                especialidad,
                servicios,
                reportes
             }),
        })
    },

    update: async (id_taller: number, data: Partial<Taller>): Promise<Taller> => {
        const { 
            nombre,
            direccion,
            telefono,
            email_contacto,
            horario,
            especialidad,
            servicios,
            reportes
         } = data;
        return await fetchAPI(`/taller/${id_taller}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                nombre,
                direccion,
                telefono,
                email_contacto,
                horario,
                especialidad,
                servicios,
                reportes
             }),
        });
    },

    remuve: async (id_taller: number): Promise<void> => {
        return await fetchAPI(`/taller/${id_taller}`, {
            method: 'DELETE',
        });
    }
}