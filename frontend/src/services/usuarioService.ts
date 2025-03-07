import { Usuario } from "../types/types";
import { fetchAPI } from "./api";

export const usuarioService = {

    findAll: async (): Promise<Usuario[]> => {
        return await fetchAPI('/usuario');
    },
    findById: async (id_usuario: number): Promise<Usuario> => {
        return await fetchAPI(`/usuario/${id_usuario}`);
    },
    create: async (data: Partial<Usuario>): Promise<Usuario> => {
        const { 
            id_usuario,
            nombre_completo,
            username,
            email,
            telefono,
            fecha_creacion = new Date().toISOString(),
            password_hash,
            taller,
            
        } = data;
        return await fetchAPI('/usuario', {
            method: 'POST',
            body: JSON.stringify({ 
                id_usuario,
                nombre_completo,
                username,
                email,
                telefono,
                fecha_creacion,
                password_hash,
                taller
                
             }),
        })
    },
    update: async (id_usuario: number, changes: Partial<Usuario>): Promise<Usuario> => {
        const { 
            nombre_completo,
            username,
            email,
            telefono,
            password_hash,
            taller
            
         } = changes;
        return await fetchAPI(`/usuario/${id_usuario}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                nombre_completo,
                username,
                email,
                telefono,
                password_hash,
                taller
                
             }),
        });
    },
    remuve: async (id_usuario: number): Promise<void> => {
        return await fetchAPI(`/usuario/${id_usuario}`, {
            method: 'DELETE',
        });
    },
    // Nuevo método para asignar un rol a un usuario
    assignRole: async (userId: number, roleId: number): Promise<void> => {
        return await fetchAPI(`/usuario/${userId}/rol/${roleId}`, {
            method: 'POST',
        });
    },

}