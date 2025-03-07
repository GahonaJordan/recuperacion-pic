import React, { useEffect, useRef, useState } from "react";
import { Vehiculo } from "../types/types";
import { Toast } from "primereact/toast";
import { vehiculoService } from "../services/vehiculoService";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";

export const Vehiculos: React.FC = () => {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const toast = useRef<Toast>(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [edittingVehiculo, setEdittingVehiculo] = useState<Partial<Vehiculo>>({});
    const [selectedVehiculo, setSelectedVehiculo] = useState<Vehiculo>();
    
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
        loadVehiculos();
    }, []);

    const openNew = () => {
        console.log("Opening new dialog");
        setEdittingVehiculo({});
        setDisplayDialog(true);
    }

    const hideDialog = () => {
        setDisplayDialog(false);
    }

    const saveVehiculo = async () => {
        try {
            if (!edittingVehiculo.fecha_registro) {
                edittingVehiculo.fecha_registro = new Date();
            }
            if (edittingVehiculo.id_vehiculo) {
                await vehiculoService.update(edittingVehiculo.id_vehiculo, edittingVehiculo);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Vehiculo actualizado exitosamente',
                    life: 3000
                });
            } else {
                await vehiculoService.create(edittingVehiculo);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Vehiculo creado exitosamente',
                    life: 3000
                });
            }
            loadVehiculos();
            setDisplayDialog(false);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al guardar el vehiculo',
                life: 3000
            });
        }
    }

    const footerDialog = () => {
        return (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={saveVehiculo} />
                <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
            </div>
        );
    }

    return (
        <div>
            <Toast ref={toast} />
            <h2>Vehiculos</h2>
            <Button label="Nuevo" icon="pi pi-plus" onClick={openNew} />
            <DataTable value={vehiculos} >
                <Column field="id_vehiculo" header="ID" />
                <Column field="marca" header="Marca" />
                <Column field="modelo" header="Modelo" />
                <Column field="año" header="Año" />
                <Column field="numero_placa" header="Numero de Placa" />
                <Column field="color" header="Color" />
                <Column field="tipo" header="Tipo" />
                <Column field="ondometro" header="Ondometro" />
                <Column field="estado" header="Estado" />
                <Column field="fecha_registro" header="Fecha de Registro" body={(rowData: Vehiculo) => new Date(rowData.fecha_registro).toLocaleDateString()} />
                <Column 
                    header="Acciones"
                    body={(rowData: Vehiculo) => (
                    <div>
                        <Button 
                            icon="pi pi-pencil" 
                            className="p-button-rounded p-button-success p-mr-2" 
                            onClick={() => {
                                setEdittingVehiculo(rowData);
                                setDisplayDialog(true);
                        }} />
                        <Button 
                            icon="pi pi-trash" 
                            className="p-button-rounded p-button-danger" 
                            onClick={async () => {
                            if(rowData.id_vehiculo !== undefined) {
                                await vehiculoService.remuve(rowData.id_vehiculo);
                                loadVehiculos();
                            }
                        }} />
                    </div>
                )} />
            </DataTable>
            <Dialog
                visible={displayDialog}
                style={{ width: '450px' }}
                header="Vehiculo"
                modal footer={footerDialog}
                onHide={hideDialog}
            >
                    <div className="p-field">
                        <label htmlFor="marca">Marca</label>
                        <input id="marca" type="text" className="p-inputtext" value={edittingVehiculo.marca} onChange={(e) => setEdittingVehiculo({ ...edittingVehiculo, marca: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="modelo">Modelo</label>
                        <input id="modelo" type="text" className="p-inputtext" value={edittingVehiculo.modelo} onChange={(e) => setEdittingVehiculo({ ...edittingVehiculo, modelo: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="año">Año</label>
                        <input id="año" type="number" className="p-inputtext" value={edittingVehiculo.año} onChange={(e) => setEdittingVehiculo({ ...edittingVehiculo, año: Number(e.target.value) })} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="numero_placa">Numero de Placa</label>
                        <input id="numero_placa" type="text" className="p-inputtext" value={edittingVehiculo.numero_placa} onChange={(e) => setEdittingVehiculo({ ...edittingVehiculo, numero_placa: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="color">Color</label>
                        <input id="color" type="text" className="p-inputtext" value={edittingVehiculo.color} onChange={(e) => setEdittingVehiculo({ ...edittingVehiculo, color: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="tipo">Tipo</label>
                        <select id="tipo" className="p-inputtext" value={edittingVehiculo.tipo} onChange={(e) => setEdittingVehiculo({ ...edittingVehiculo, tipo: e.target.value })}>
                            <option value="">Seleccione un tipo</option>
                            <option value="Automóvil">Automóvil</option>
                            <option value="Camión">Camión</option>
                            <option value="Motocicleta">Motocicleta</option>
                        </select>
                    </div>
                    <div className="p-field">
                        <label htmlFor="ondometro">Ondometro</label>
                        <input id="ondometro" type="number" className="p-inputtext" value={edittingVehiculo.ondometro} onChange={(e) => setEdittingVehiculo({ ...edittingVehiculo, ondometro: Number(e.target.value) })} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="estado">Estado</label>
                        <select id="estado" className="p-inputtext" value={edittingVehiculo.estado} onChange={(e) => setEdittingVehiculo({ ...edittingVehiculo, estado: e.target.value })}>
                            <option value="">Seleccione un estado</option>
                            <option value="Activo">Activo</option>
                            <option value="En mantenimiento">En mantenimiento</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                    <div className="p-field">
                        <label htmlFor="fecha_registro">Fecha de Registro</label>
                        <input id="fecha_registro" type="date" className="p-inputtext" value={edittingVehiculo.fecha_registro ? new Date(edittingVehiculo.fecha_registro).toISOString().split('T')[0] : ''} onChange={(e) => setEdittingVehiculo({ ...edittingVehiculo, fecha_registro: new Date(e.target.value) })} />
                    </div>
                </Dialog>
        </div>
    );
}