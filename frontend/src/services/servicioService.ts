import { Registros_Servicio } from "../types/types";
import { fetchAPI } from "./api";

export const servicioService = {

    findAll: async (): Promise<Registros_Servicio[]> => {
        return await fetchAPI('/servicio');
    },

    findById: async (id_servicio: number): Promise<Registros_Servicio> => {
        return await fetchAPI(`/servicio/${id_servicio}`);
    },

    create: async (data: Partial<Registros_Servicio>): Promise<Registros_Servicio> => {
        const { 
            id_servicio,
            nombre_servicio,
            fecha_servicio,
            descripcion,
            costo,
            tipo_servicio,
            kilometraje_servicio,
            documento,
            fecha_creacion,
            talleres,
            vehiculos
         } = data;
        return await fetchAPI('/servicio', {
            method: 'POST',
            body: JSON.stringify({ 
                id_servicio,
                nombre_servicio,
                fecha_servicio,
                descripcion,
                costo,
                tipo_servicio,
                kilometraje_servicio,
                documento,
                fecha_creacion,
                talleres,
                vehiculos
            }),
        });
    },

    update: async (id_servicio: number, data: Partial<Registros_Servicio>): Promise<Registros_Servicio> => {
        const { 
            nombre_servicio,
            fecha_servicio,
            descripcion,
            costo,
            tipo_servicio,
            kilometraje_servicio,
            documento,
            fecha_creacion,
            talleres,
            vehiculos
         } = data;
        return await fetchAPI(`/servicio/${id_servicio}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                nombre_servicio,
                fecha_servicio,
                descripcion,
                costo,
                tipo_servicio,
                kilometraje_servicio,
                documento,
                fecha_creacion,
                talleres,
                vehiculos
             }),
        })
    },

    remuve: async (id_servicio: number): Promise<void> => {
        return await fetchAPI(`/servicio/${id_servicio}`, {
            method: 'DELETE'
        });
    }
}