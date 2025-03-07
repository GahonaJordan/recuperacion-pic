import React, { useEffect, useRef, useState } from "react";
import { Rol, Usuario, UsuarioRol } from "../types/types";
import { asignarrolService } from "../services/asignarrolService";
import { Toast } from "primereact/toast";
import { usuarioService } from "../services/usuarioService";
import { rolService } from "../services/rolService";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";

export const Asignarroles: React.FC = () => {
    const [usuariorol, setUsuariorol] = useState<UsuarioRol[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [roles, setRoles] = useState<Rol[]>([]);
    const toast = useRef<Toast>(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [edittingUsuariorol, setEdittingUsuariorol] = useState<Partial<UsuarioRol>>({});

    const loadUusarioRoles = async () => {
        try {
            const data = await asignarrolService.findAll();
            setUsuariorol(data);
        }catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar los roles',
                life: 3000
            });
        }
    }

    const loadUsuarios = async () => {
        try {
            const data = await usuarioService.findAll();
            setUsuarios(data);
        }catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar los usuarios',
                life: 3000
            });
        }
    }

    const loadRoles = async () => {
        try {
            const data = await rolService.findAll();
            setRoles(data);
        }catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar los roles',
                life: 3000
            });
        }
    }

    useEffect (() => {
        loadUusarioRoles();
        loadUsuarios();
        loadRoles();
    }, []);

    const openNew = () => {
        setEdittingUsuariorol({
            usuarios: 0,
            roles: 0,
            fecha_asignacion: new Date(),

        });
        setDisplayDialog(true);
    }

    const hideDialog = () => {
        setDisplayDialog(false);
    }

    const saveUsuariorol = async () => {
        try {
            if(edittingUsuariorol.id_usuario_rol){
                await asignarrolService.update(edittingUsuariorol.id_usuario_rol, edittingUsuariorol);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Rol actualizado exitosamente',
                    life: 3000
                });
            }else{
                await asignarrolService.create(edittingUsuariorol);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Rol creado exitosamente',
                    life: 3000
                });
            }
            loadUusarioRoles();
            setDisplayDialog(false);
        }catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al guardar el rol',
                life: 3000
        });
    } 
    }

    const footerDialog = () => {
        return (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={saveUsuariorol} />
                <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
            </div>
        );
    }

    return (
        <div>
            <Toast ref={toast} />
            <h2>Bienvenido a la página de asignar roles</h2>
            <Button label="Nuevo" icon="pi pi-plus" onClick={openNew} />
            <DataTable value={usuariorol}>
                <Column field="id_usuario_rol" header="ID" />
                <Column field="usuarios" header="Usuario" />
                <Column field="roles" header="Rol" />
                <Column field="fecha_asignacion" header="Fecha de asignación" />
                <Column 
                    header="Acciones"
                    body={(rowData: UsuarioRol) => {
                        return (
                            <div>
                                <Button 
                                    icon="pi pi-pencil" 
                                    className="p-button-rounded p-button-success p-mr-2" 
                                    onClick={() => {
                                        setEdittingUsuariorol(rowData)
                                        setDisplayDialog(true)}}/>
                                <Button 
                                    icon="pi pi-trash" 
                                    className="p-button-rounded p-button-danger" 
                                    onClick={async () => {
                                        if(rowData.id_usuario_rol !== undefined){
                                            await asignarrolService.remuve(rowData.id_usuario_rol);
                                            loadUusarioRoles();
                                        }
                                        loadUusarioRoles();
                                    }} />
                            </div>
                        );
                    }}
                />
            </DataTable>
            <Dialog
                visible={displayDialog}
                header={edittingUsuariorol.id_usuario_rol ? 'Editar Rol' : 'Nuevo Rol'}
                style={{ width: '450px' }}
                modal
                className="p-fluid"
                footer={footerDialog}
                onHide={hideDialog}
            >
                <div className="p-field">
                    <label htmlFor="usuarios">Usuario</label>
                    <select 
                        id="usuarios" 
                        className="p-inputtext"
                        value={edittingUsuariorol.usuarios} 
                        onChange={(e) => setEdittingUsuariorol({ ...edittingUsuariorol, usuarios: Number(e.target.value) })}
                    >
                        <option value={0}>Seleccione un usuario</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id_usuario} value={usuario.id_usuario}>
                                {usuario.nombre_completo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="roles">Rol</label>
                    <select 
                        id="roles" 
                        className="p-inputtext"
                        value={edittingUsuariorol.roles} 
                        onChange={(e) => setEdittingUsuariorol({ ...edittingUsuariorol, roles: Number(e.target.value) })}
                    >
                        <option value={0}>Seleccione un rol</option>
                        {roles.map((rol) => (
                            <option key={rol.id_rol} value={rol.id_rol}>
                                {rol.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                
            </Dialog>
        </div>
    );
}