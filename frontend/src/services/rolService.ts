import { Rol } from "../types/types";
import { fetchAPI } from "./api";

export const rolService = {

    findAll: async (): Promise<Rol[]> => {
        return await fetchAPI('/rol');
    },
    findById: async (id: number): Promise<Rol> => {
        return await fetchAPI(`/rol/${id}`);
    },
    create: async (data: Partial<Rol>): Promise<Rol> => {
        const { nombre, descripcion } = data;
        return await fetchAPI('/rol', {
            method: 'POST',
            body: JSON.stringify({ nombre, descripcion }),
        })
    },
    update: async (id: number, data: Partial<Rol>): Promise<Rol> => {
        const { nombre, descripcion } = data;
        return await fetchAPI(`/rol/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ nombre, descripcion }),
        });
    },
    remuve: async (id: number): Promise<void> => {
        return await fetchAPI(`/rol/${id}`, {
            method: 'DELETE',
        });
    }

}