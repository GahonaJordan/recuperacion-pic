import React, { useEffect, useRef, useState } from "react";
import { Notificacion, Vehiculo } from "../types/types";
import { Toast } from "primereact/toast";
import { notificacionService } from "../services/notificacionService";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Vehiculos } from "./Vehiculo";
import { vehiculoService } from "../services/vehiculoService";

export const Notificaciones: React.FC = () => {
    const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const toast = useRef<Toast>(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [edittingNotificacion, setEdittingNotificacion] = useState<Partial<Notificacion>>({});
    const [selectedNotificacion, setSelectedNotificacion] = useState<Notificacion>();

    const loadNotificaciones = async () => {
        try {
            const data = await notificacionService.findAll();
            const enrichedData = data.map((notificacion) => ({
                ...notificacion,
                vehiculoNombre: vehiculos.find(
                    (vehiculo) => vehiculo.id_vehiculo === notificacion.vehiculos
                )?.numero_placa || "Desconocido", // Cambia "nombre" por la propiedad adecuada del vehículo.
            }));
            setNotificaciones(data);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar las notificaciones',
                life: 3000
            });
        }
    }

    const loadVehiculos = async () => {
            try {
                const data = await vehiculoService.findAll();
                setVehiculos(data);
            } catch (error) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al cargar los vehiculos',
                    life: 3000
                });
            }
        }

    useEffect(() => {
        loadNotificaciones();
        loadVehiculos();
    }, []);

    const openNew = () => {
        setEdittingNotificacion({
            vehiculos: 0, // Asignar el primer id_vehiculo disponible
            descripcion: '',
            fecha_programada: new Date(), // Permitir cualquier fecha
            estado: '', // Valor por defecto
        });
        setDisplayDialog(true);
    }

    const hideDialog = () => {
        setDisplayDialog(false);
    }

    const saveNotificacion = async () => {
        try {
            if (edittingNotificacion.id_notificacion) {
                await notificacionService.update(edittingNotificacion.id_notificacion, edittingNotificacion);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Notificacion actualizada exitosamente',
                    life: 3000
                });
            } else {
                await notificacionService.create(edittingNotificacion);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Notificacion creada exitosamente',
                    life: 3000
                });
            }
            loadNotificaciones();
            setDisplayDialog(false);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al guardar la notificacion',
                life: 3000
            });
        }
    }

    const footerDialog = () => {
        return (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={saveNotificacion} />
                <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setNotificaciones({ ...notificaciones, [name as string]: value });
      };

    return (
        <div>
            <Toast ref={toast} />
            <h2>Notificaciones</h2>
            <Button label="Nuevo" icon="pi pi-plus" onClick={openNew} />
            <DataTable value={notificaciones} >
                <Column field="id_notificacion" header="ID" />
                <Column field="vehiculoNombre" header="Vehiculo" />
                <Column field="descripcion" header="Descripción" />
                <Column field="fecha_programada" header="Fecha Programada" />
                <Column field="estado" header="Estado" />
                <Column 
                    header="Acciones" 
                    body={(rowData: Notificacion) => (
                        <div>
                            <Button 
                                icon="pi pi-pencil" 
                                className="p-button-rounded p-button-success p-mr-2" 
                                onClick={() => {
                                setEdittingNotificacion(rowData);
                                setDisplayDialog(true);
                            }} />
                            <Button 
                                icon="pi pi-trash" 
                                className="p-button-rounded p-button-danger" 
                                onClick={async () => {
                                if(rowData.id_notificacion !== undefined) {
                                    await notificacionService.remuve(rowData.id_notificacion);
                                    loadNotificaciones();
                                }
                            }} />
                        </div>
                    )} />
            </DataTable>
            <Dialog
                visible={displayDialog}
                style={{ width: '450px' }}
                header="Notificacion"
                modal footer={footerDialog()}
                onHide={hideDialog}
                >
                <div className="p-field">
                    <label htmlFor="id_vehiculo">Vehiculo</label>
                    <select 
                        id="id_vehiculo" 
                        className="p-inputtext"
                        value={edittingNotificacion.vehiculos ?? ''} 
                        onChange={(e) => setEdittingNotificacion({ ...edittingNotificacion, vehiculos: Number(e.target.value) })}>
                        <option value="">Seleccione un Vehiculo</option>
                        {vehiculos.map((vehiculo) => (
                            <option key={vehiculo.id_vehiculo} value={vehiculo.id_vehiculo}>
                                {vehiculo.numero_placa}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="descripcion">Descripcion</label>
                    <input 
                        id="descripcion" 
                        className="p-inputtext"
                        value={edittingNotificacion.descripcion} 
                        onChange={(e) => setEdittingNotificacion({ ...edittingNotificacion, descripcion: e.target.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="fecha_programada">Fecha Programada</label>
                    <input 
                        id="fecha_programada" 
                        type="date"
                        className="p-inputtext"
                        value={edittingNotificacion.fecha_programada ? new Date(edittingNotificacion.fecha_programada).toISOString().split('T')[0] : ''} 
                        onChange={(e) => setEdittingNotificacion({ ...edittingNotificacion, fecha_programada: new Date(e.target.value) })} />
                </div>
                <div className="p-field">
                    <label htmlFor="estado">Estado</label>
                    <select 
                        id="estado" 
                        className="p-inputtext"
                        value={edittingNotificacion.estado} 
                        onChange={(e) => setEdittingNotificacion({ ...edittingNotificacion, estado: e.target.value })}>
                        <option value="">Seleccione un Estado</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Completado">Completado</option>
                    </select>
                </div>
            </Dialog>
        </div>
            
    );
}