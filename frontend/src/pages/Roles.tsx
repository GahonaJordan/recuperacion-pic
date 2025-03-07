import React, { useEffect, useRef, useState } from 'react';
import { Rol } from '../types/types';
import { Toast } from 'primereact/toast';
import { rolService } from '../services/rolService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export const Roles: React.FC = () => {
    const [roles, setRoles] = useState<Rol[]>([]);
    const toast = useRef<Toast>(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [edittingRol, setEdittingRol] = useState<Partial<Rol>>({});

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
        loadRoles();
    }, []);

    const openNew = () => {
        setEdittingRol({});
        setDisplayDialog(true);
    }

    const hideDialog = () => {
        setDisplayDialog(false);
    }

    const saveRol = async () => {
        try {
            if(edittingRol.id_rol){
                await rolService.update(edittingRol.id_rol, edittingRol);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Rol actualizado exitosamente',
                    life: 3000
                });
            }else{
                await rolService.create(edittingRol);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Rol creado exitosamente',
                    life: 3000
                });
            }
            
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
                <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog}/>
                <Button label="Guardar" icon="pi pi-check" onClick={saveRol}/>
            </div>
        );
    }

    return (
        <div>
            <Toast ref={toast} />
            <h2>Bienvenido a la página de roles</h2>
            <Button label="Nuevo Rol" icon="pi pi-plus" onClick={openNew}/>
            <DataTable value={roles}>
                <Column field="id_rol" header="ID"></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="descripcion" header="Descripción"></Column>
                <Column 
                    header="Acciones"
                    body={(rowData: Rol) => (
                        <>
                            <Button 
                                icon="pi pi-pencil"
                                children=""
                                onClick={()  => {
                                    setEdittingRol({...rowData});
                                    setDisplayDialog(true);
                                }}
                            />
                            <Button 
                                icon="pi pi-trash"
                                onClick={async () => {
                                    if (rowData.id_rol !== undefined) {
                                        await rolService.remuve(rowData.id_rol);
                                        loadRoles();
                                    }
                                    loadRoles();
                                }}
                            />
                        </>
                    )}
                />
            </DataTable>
            <Dialog 
                visible = {displayDialog} 
                header={edittingRol.id_rol ? 'Editar Rol' : 'Nuevo Rol'}
                onHide={hideDialog}
                footer={footerDialog}
                >
                <div className='p-field'>
                    <label htmlFor='nombre'>Rol</label>
                    <InputText
                        id='nombre'
                        value={edittingRol.nombre || ''}
                        onChange={(e) => setEdittingRol({...edittingRol, nombre: e.target.value})}
                    />
                    <label htmlFor='descripcion'>Descripción</label>
                    <InputText
                        id='descripcion'
                        value={edittingRol.descripcion || ''}
                        onChange={(e) => setEdittingRol({...edittingRol, descripcion: e.target.value})}
                    />
                </div>
                    
            </Dialog>
        </div>
    );
};

