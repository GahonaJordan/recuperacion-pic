import { Reporte } from "../types/types";
import { fetchAPI } from "./api";

export const reporteService = {

    findAll: async (): Promise<Reporte[]> => {
        return await fetchAPI('/reporte');
    },

    findById: async (id_reporte: number): Promise<Reporte> => {
        return await fetchAPI(`/reporte/${id_reporte}`);
    },

    create: async (data: Partial<Reporte>): Promise<Reporte> => {
        const { 
            id_reporte,
            talleres,
            tipo,
            fecha_generacion,
            archivo_pdf,
            usuarios,
         } = data;
        return await fetchAPI('/reporte', {
            method: 'POST',
            body: JSON.stringify({ 
                id_reporte,
                talleres,
                tipo,
                fecha_generacion,
                archivo_pdf,
                usuarios,
             }),
        })
    },

    update: async (id_reporte: number, data: Partial<Reporte>): Promise<Reporte> => {
        const { 
            
            talleres,
            tipo,
            fecha_generacion,
            archivo_pdf,
            usuarios,
         } = data;
        return await fetchAPI(`/reporte/${id_reporte}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                
                talleres,
                tipo,
                fecha_generacion,
                archivo_pdf,
                usuarios,
             }),
        })
    },

    remuve: async (id_reporte: number): Promise<Reporte> => {
        return await fetchAPI(`/reporte/${id_reporte}`, {
            method: 'DELETE'
        })
    }
}