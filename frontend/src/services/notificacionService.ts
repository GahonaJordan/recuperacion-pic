import { fetchAPI } from "../services/api";
import { Notificacion } from "../types/types";

export const notificacionService = {
    findAll: async (): Promise<Notificacion[]> => {
        return await fetchAPI('/notificacion');
    },

    findById: async (id_notificacion: number): Promise<Notificacion> => {
        return await fetchAPI(`/notificacion/${id_notificacion}`);
    },

    create: async (data: Partial<Notificacion>): Promise<Notificacion> => {
        const { 
            id_notificacion,
            vehiculos,          
            descripcion,
            fecha_programada,
            estado,
            
         } = data;
        return await fetchAPI('/notificacion', {
            method: 'POST',
            body: JSON.stringify({ 
                id_notificacion,
                vehiculos,
                descripcion,
                fecha_programada,
                estado,
             }),
        })
    },

    update: async (id_notificacion: number, data: Partial<Notificacion>): Promise<Notificacion> => {
        const {          
            descripcion,
            fecha_programada,
            estado,
         } = data;
        return await fetchAPI(`/notificacion/${id_notificacion}`, {
            method: 'PUT',
            body: JSON.stringify({        
                descripcion,
                fecha_programada,
                estado,
             }),
        })
    },

    remuve: async (id_notificacion: number): Promise<Notificacion> => {
        return await fetchAPI(`/notificacion/${id_notificacion}`, {
            method: 'DELETE'
        });
    }
}