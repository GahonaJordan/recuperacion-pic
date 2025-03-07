import React, { useEffect, useRef, useState } from "react";
import { Registros_Servicio, Taller, Vehiculo } from "../types/types";
import { Toast } from "primereact/toast";
import { servicioService } from "../services/servicioService";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { tallerService } from "../services/tallerService";
import { vehiculoService } from "../services/vehiculoService";

export const Servicios: React.FC = () => {
    const [servicios, setServicios] = useState<Registros_Servicio[]>([]);
    const [talleres, setTalleres] = useState<Taller[]>([]);
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const toast = useRef<Toast>(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [edittingServicio, setEdittingServicio] = useState<Partial<Registros_Servicio>>({});
    const [selectedServicio, setSelectedServicio] = useState<Registros_Servicio>();

    const loadServicios = async () => {
        try {
            const data = await servicioService.findAll();
            setServicios(data);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar los servicios',
                life: 3000
            });
        }
    }

    const loadTalleres = async () => {
        try {
            const data = await tallerService.findAll();
            setTalleres(data);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar los talleres',
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
                detail: 'Error al cargar los vehículos',
                life: 3000
            });
        }
    }

    useEffect(() => {
        loadServicios();
        loadTalleres();
        loadVehiculos();
    }, []);

    const openNew = () => {
        setEdittingServicio({
            nombre_servicio: '',
            fecha_servicio: new Date(),
            descripcion: '',
            costo: 0,
            tipo_servicio: '',
            kilometraje_servicio: 0,
            documento: '',
            fecha_creacion: new Date(),
            talleres: 0,
            vehiculos: 0
        });
        setDisplayDialog(true);
    }

    const hideDialog = () => {
        setDisplayDialog(false);
    }

    const saveServicio = async () => {
        try {
            if (edittingServicio.id_servicio) {
                await servicioService.update(edittingServicio.id_servicio, edittingServicio);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Servicio actualizado exitosamente',
                    life: 3000
                });
            } else {
                await servicioService.create(edittingServicio);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Servicio creado exitosamente',
                    life: 3000
                });
            }
            loadServicios();
            setDisplayDialog(false);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al guardar el servicio',
                life: 3000
            });
        }
    }

    const footerDialog = () => {
        return (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={saveServicio} />
                <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} />
            </div>
        );
    }

    return (
        <div>
            <Toast ref={toast} />
            <h2>Servicios</h2>
            <Button label="Nuevo" icon="pi pi-plus" onClick={openNew} />
            <DataTable value={servicios} >
                <Column field="id_servicio" header="ID" />
                <Column field="nombre_servicio" header="Nombre" />
                <Column field="fecha_servicio" header="Fecha" />
                <Column field="descripcion" header="Descripción" />
                <Column field="costo" header="Costo" />
                <Column field="tipo_servicio" header="Tipo" />
                <Column field="kilometraje_servicio" header="Kilometraje" />
                <Column field="documento" header="Documento" />
                <Column field="fecha_creacion" header="Fecha Creación" />
                <Column field="id_taller" header="ID Taller" />
                <Column field="id_vehiculo" header="ID Vehículo" />
                <Column
                    header="Acciones"
                    body={(rowData: Registros_Servicio) => (
                        <div>
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => {
                                setEdittingServicio({ ...rowData });
                                setDisplayDialog(true);
                            }} />
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => {
                                setSelectedServicio(rowData);
                                setDisplayDialog(true);
                            }} />
                        </div>
                    )}
                />
            </DataTable>

            <Dialog
                header="Servicio"
                visible={displayDialog}
                style={{ width: '450px' }}
                footer={footerDialog}
                onHide={hideDialog}
            >
                <div className="p-field">
                    <label htmlFor="nombre_servicio">Nombre</label>
                    <InputText id="nombre_servicio" value={edittingServicio.nombre_servicio} onChange={(e) => setEdittingServicio({ ...edittingServicio, nombre_servicio: e.target.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="fecha_servicio">Fecha</label>
                    <InputText type="date" id="fecha_servicio" value={edittingServicio.fecha_servicio ? new Date(edittingServicio.fecha_servicio).toISOString().split('T')[0] : ''} onChange={(e) => setEdittingServicio({ ...edittingServicio, fecha_servicio: new Date(e.target.value) })} />
                </div>             
                <div className="p-field">
                    <label htmlFor="descripcion">Descripción</label>
                    <InputText id="descripcion" value={edittingServicio.descripcion} onChange={(e) => setEdittingServicio({ ...edittingServicio, descripcion: e.target.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="costo">Costo</label>
                    <InputText id="costo" value={edittingServicio.costo?.toString() || ''} onChange={(e) => setEdittingServicio({ ...edittingServicio, costo: Number(e.target.value) })} />
                </div>
                <div className="p-field">
                    <label htmlFor="tipo_servicio">Tipo</label>
                    <select id="tipo_servicio" className="p-inputtext" value={edittingServicio.tipo_servicio} onChange={(e) => setEdittingServicio({ ...edittingServicio, tipo_servicio: e.target.value })}>
                        <option value="">Seleccione un tipo</option>
                        <option value="Preventivo">Preventivo</option>
                        <option value="Correctivo">Correctivo</option>
                        <option value="Revisión técnica">Revisión técnica</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="kilometraje_servicio">Kilometraje</label>
                    <InputText id="kilometraje_servicio" value={edittingServicio.kilometraje_servicio?.toString() || ''} onChange={(e) => setEdittingServicio({ ...edittingServicio, kilometraje_servicio: Number(e.target.value) })} />
                </div>
                <div className="p-field">
                    <label htmlFor="documento">Documento</label>
                    <InputText id="documento" value={edittingServicio.documento} onChange={(e) => setEdittingServicio({ ...edittingServicio, documento: e.target.value })} />
                </div>
                
                <div className="p-field">
                    <label htmlFor="id_taller">Taller</label>
                    <select
                        id="id_taller"
                        className="p-inputtext"
                        value={edittingServicio.talleres}
                        onChange={(e) => setEdittingServicio({ ...edittingServicio, talleres: Number(e.target.value) })}>
                        <option value="">Seleccione un taller</option>
                        {talleres.map((taller) => (
                            <option key={taller.id_taller} value={taller.id_taller}>
                                {taller.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="id_vehiculo">ID Vehículo</label>
                    <select
                        id="id_vehiculo"
                        className="p-inputtext"
                        value={edittingServicio.vehiculos}
                        onChange={(e) => setEdittingServicio({ ...edittingServicio, vehiculos: Number(e.target.value) })}>
                        <option value="">Seleccione un vehículo</option>
                        {vehiculos.map((vehiculo) => (
                            <option key={vehiculo.id_vehiculo} value={vehiculo.id_vehiculo}>
                                {vehiculo.marca} {vehiculo.modelo} {vehiculo.año}
                            </option>
                        ))}
                    </select>
                </div>
            </Dialog>
        </div>
    );
}

