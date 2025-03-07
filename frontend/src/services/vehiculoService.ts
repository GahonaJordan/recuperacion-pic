import { Vehiculo } from "../types/types";
import { fetchAPI } from "./api";

export const vehiculoService = {
    findAll: async (): Promise<Vehiculo[]> => {
        return await fetchAPI('/vehiculo');
    },

    findById: async (id_vehiculo: number): Promise<Vehiculo> => {
        return await fetchAPI(`/vehiculo/${id_vehiculo}`);
    },

    create: async (data: Partial<Vehiculo>): Promise<Vehiculo> => {
        const { 
            id_vehiculo,
            marca,
            modelo,
            año,
            numero_placa,
            color,
            tipo,
            ondometro,
            estado,
            fecha_registro
         } = data;
        return await fetchAPI('/vehiculo', {
            method: 'POST',
            body: JSON.stringify({ 
                id_vehiculo,
                marca,
                modelo,
                año,
                numero_placa,
                color,
                tipo,
                ondometro,
                estado,
                fecha_registro
             }),
        })
    },

    update: async (id_vehiculo: number, data: Partial<Vehiculo>): Promise<Vehiculo> => {
        const { 
            marca,
            modelo,
            año,
            numero_placa,
            color,
            tipo,
            ondometro,
            estado,
            fecha_registro
         } = data;
        return await fetchAPI(`/vehiculo/${id_vehiculo}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                marca,
                modelo,
                año,
                numero_placa,
                color,
                tipo,
                ondometro,
                estado,
                fecha_registro
             }),
        })
    },

    remuve: async (id_vehiculo: number): Promise<void> => {
        return await fetchAPI(`/vehiculo/${id_vehiculo}`, {
            method: 'DELETE'
        })
    }
}