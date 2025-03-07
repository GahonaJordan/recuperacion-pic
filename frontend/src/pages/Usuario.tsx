import React, { useEffect, useRef, useState } from 'react';
import { Rol, Taller, Usuario } from '../types/types';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { Roles } from './Roles';
import { Button } from 'primereact/button';
import { rolService } from '../services/rolService';
import { usuarioService } from '../services/usuarioService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { tallerService } from '../services/tallerService';

export const Usuarios: React.FC = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [talleres, setTalleres] = useState<Taller[]>([]);
    const toast = useRef<Toast>(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [edittingUsuario, setEdittingUsuario] = useState<Partial<Usuario>>({});
    const [displayRoleDialog, setDisplayRoleDialog] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Rol>();
    const [Roles, setRoles] = useState<Rol[]>([]);

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

    const loadTalleres = async () => {
        try {
            const data = await tallerService.findAll();
            setTalleres(data);
        }catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar los talleres',
                life: 3000
            });
        }
    }

    useEffect (() => {
        loadUsuarios();
        loadTalleres();
    }, []);

    const openNew = () => {
        setEdittingUsuario({
            nombre_completo: '',
            username: '',
            email: '',
            telefono: '',
            password_hash: '',
            taller: 0
        });
        setDisplayDialog(true);
    }

    const hideDialog = () => {
        setDisplayDialog(false);
    }

    const saveUsuario = async () => {
        try {
            if(edittingUsuario.id_usuario){
                await usuarioService.update(edittingUsuario.id_usuario, edittingUsuario);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Usuario actualizado exitosamente',
                    life: 3000
                });
            }else{
                await usuarioService.create(edittingUsuario);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Usuario creado exitosamente',
                    life: 3000
                });
            }
            loadUsuarios(); // Update the table after saving
            setDisplayDialog(false); // Close the dialog after saving
        }catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al guardar el usuario',
                life: 3000
            });
        }
    }

    const footerDialog = () => {
        return (
            <div>
                <Button label='Cancelar' icon='pi pi-times' className='p-button-text' onClick={hideDialog} />
                <Button label='Guardar' icon='pi pi-check' className='p-button-text' onClick={saveUsuario} />
            </div>
        );
    }
    const openRoleDialog = async (usuarios: Usuario) => {
        setEdittingUsuario(usuarios);
        try {
            const dataRoles = await rolService.findAll();
            setRoles(dataRoles);

        }catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar los roles',
                life: 3000
            });

        }
    }

    const asignarRol = async () => {
        if (!edittingUsuario.id_usuario || !selectedRole) return;
        try {
            if (edittingUsuario.id_usuario !== undefined && selectedRole.id_rol !== undefined) {
                await usuarioService.assignRole(edittingUsuario.id_usuario, selectedRole.id_rol);
            }
            toast.current?.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Rol asignado exitosamente',
                life: 3000
            });
            setDisplayRoleDialog(false);
            loadUsuarios();
        }catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al asignar el rol',
                life: 3000
            });
        }
        
    }

    return (
        <div>
            <Toast ref={toast} />
            <h2>Bienvenido a la página de Usuarios</h2>
            <Button label='Nuevo' icon='pi pi-plus' onClick={openNew} />
            <DataTable value={usuarios}>
            <Column field='id_usuario' header='ID'></Column>
            <Column field='nombre_completo' header='Nombre Completo'></Column>
            <Column field='username' header='Usuario'></Column>
            <Column field='email' header='Email'></Column>
            <Column field='telefono' header='Telefono'></Column>
            <Column field='fecha_creacion' header='Fecha Creacion'></Column>    
            <Column field='id_taller' header='ID Taller'></Column>
            
            <Column 
                header='Acciones'
                body={(rowData: Usuario) => (
                <>
                    <Button 
                    icon='pi pi-pencil' 
                    children=""
                    onClick={() => {
                        setEdittingUsuario(rowData);
                        setDisplayDialog(true);
                    }}
                    />
                    <Button 
                    icon='pi pi-user-plus' 
                    onClick={async () =>  {
                        if(rowData.id_usuario !== undefined){
                        await usuarioService.remuve(rowData.id_usuario);
                        loadUsuarios();
                        }
                    }}
                    />
                </>
            )}
            />                             
        </DataTable>
            <Dialog
            visible={displayDialog}
            header={edittingUsuario.id_usuario ? 'Editar Usuario' : 'Nuevo Usuario'}
            onHide={() => {
                hideDialog();
                loadUsuarios();
            }}
            footer={footerDialog}
            >
            <div className='p-field'>
                <label htmlFor='nombre_completo'>Nombre Completo</label>
                <InputText
                id='nombre_completo'
                value={edittingUsuario.nombre_completo || ''}
                onChange={(e) => setEdittingUsuario({...edittingUsuario, nombre_completo: e.target.value})}
                />
                <label htmlFor='username'>Usuario</label>
                <InputText
                id='username'
                value={edittingUsuario.username || ''}
                onChange={(e) => setEdittingUsuario({...edittingUsuario, username: e.target.value})}
                />
                <label htmlFor='email'>Email</label>
                <InputText
                id='email'
                value={edittingUsuario.email || ''}
                onChange={(e) => setEdittingUsuario({...edittingUsuario, email: e.target.value})}
                />
                <label htmlFor='telefono'>Telefono</label>
                <InputText
                id='telefono'
                value={edittingUsuario.telefono || ''}
                onChange={(e) => setEdittingUsuario({...edittingUsuario, telefono: e.target.value})}
                />
                
                <label htmlFor='password_hash'>Password</label>
                <InputText
                id='password_hash'
                value={edittingUsuario.password_hash || ''}
                onChange={(e) => setEdittingUsuario({...edittingUsuario, password_hash: e.target.value})}
                />
                <label htmlFor='id_taller'>ID Taller</label>
                <select
                    id='id_taller'
                    className='p-inputtext'
                    value={edittingUsuario.taller}
                    onChange={(e) => setEdittingUsuario({...edittingUsuario, taller: Number(e.target.value)})}
                >
                    <option value={0}>Seleccione un taller</option>
                    {talleres.map((taller) => (
                        <option key={taller.id_taller} value={taller.id_taller}>
                            {taller.nombre}
                        </option>
                    ))}
                </select>
                
            </div>
            </Dialog>
                
            <Dialog
            visible={displayRoleDialog}
            header="Asignar rol"
            onHide={() => setDisplayRoleDialog(false)}
            >
            <div className='p-field'>
                <label htmlFor='rol'>Selecione un Rol</label>
                <Dropdown id='rol' 
                value={selectedRole} 
                options={Roles} 
                optionLabel='nombre'
                placeholder='Seleccione ...'
                onChange={e => setSelectedRole(e.value)} 
                /> 
            </div>
            <div className='p-mt-3'>
                <Button 
                label='Cancelar' 
                icon='pi pi-times'  
                onClick={() => {
                    setDisplayRoleDialog(false);
                    loadUsuarios();
                }} />
                <Button label='Asignar' icon='pi pi-check' onClick={asignarRol} />    
            </div>
            </Dialog>
        </div>
    );
};

