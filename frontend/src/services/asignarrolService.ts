import { UsuarioRol } from "../types/types";
import { fetchAPI } from "./api";

export const asignarrolService = {

    findAll: async (): Promise<UsuarioRol[]> => {
        return await fetchAPI('/usuario-rol');
    },

    findById: async (id_usuario_rol: number): Promise<UsuarioRol> => {
        return await fetchAPI(`/usuario-rol/${id_usuario_rol}`);
    },

    create: async (data: Partial<UsuarioRol>): Promise<UsuarioRol> => {
        const { 
            id_usuario_rol,
            usuarios,
            roles,
            fecha_asignacion,
         } = data;
        return await fetchAPI('/usuario-rol', {
            method: 'POST',
            body: JSON.stringify({ 
                id_usuario_rol,
                usuarios,
                roles,
                fecha_asignacion,
             }),
        })
    },

    update: async (id_usuario_rol: number, data: Partial<UsuarioRol>): Promise<UsuarioRol> => {
        const { 
            usuarios,
            roles,
            
         } = data;
        return await fetchAPI(`/usuario-rol/${id_usuario_rol}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                usuarios,
                roles,
                
             }),
        })
    },

    remuve: async (id_usuario_rol: number): Promise<UsuarioRol> => {
        return await fetchAPI(`/usuario-rol/${id_usuario_rol}`, {
            method: 'DELETE'
        });
    }
}