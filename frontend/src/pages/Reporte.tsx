import React, { useEffect, useRef, useState } from "react";
import { Reporte, Taller, Usuario } from "../types/types";
import { Toast } from "primereact/toast";
import { reporteService } from "../services/reporteService";
import { usuarioService } from "../services/usuarioService";
import { tallerService } from "../services/tallerService";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export const Reportes: React.FC = () => {
    const [reportes, setReportes] = useState<Reporte[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [talleres, setTalleres] = useState<Taller[]>([]);
    const toast = useRef<Toast>(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [edittingReporte, setEdittingReporte] = useState<Partial<Reporte>>({});
    const [selectedReporte, setSelectedReporte] = useState<Reporte>();

    const loadReportes = async () => {
        try {
            const data = await reporteService.findAll();
            setReportes(data);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar los reportes',
                life: 3000
            });
        }
    }

    const loadUsuarios = async () => {
        try {
            const data = await usuarioService.findAll();
            setUsuarios(data);
        } catch (error) {
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
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar los talleres',
                life: 3000
            });
        }
    }

    useEffect(() => {
        loadReportes();
        loadUsuarios();
        loadTalleres();
    }, []);

    const openNew = () => {
        setEdittingReporte({
            talleres: 0,
            tipo: '',
            fecha_generacion: new Date(),
            archivo_pdf: '',
            usuarios: 0,
        });
        setDisplayDialog(true);
    }

    const hideDialog = () => {
        setDisplayDialog(false);
    }

    const saveReporte = async () => {
        try {
            if (edittingReporte.id_reporte) {
                await reporteService.update(edittingReporte.id_reporte, edittingReporte);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Reporte actualizado exitosamente',
                    life: 3000
                });
            } else {
                await reporteService.create(edittingReporte);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Reporte creado exitosamente',
                    life: 3000
                });
            }
            loadReportes();
            setDisplayDialog(false);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al guardar el reporte',
                life: 3000
            });
        }
    }

    const footerDialog = () => {
        return (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={saveReporte} />
                <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} />
            </div>
        );
    }

    return (
        <div>
            <Toast ref={toast} />
            <h2>Reportes</h2>
            <Button label="Nuevo" icon="pi pi-plus" onClick={openNew} />
            <DataTable value={reportes} >
                <Column field="id_reporte" header="ID" />
                <Column field="talleres" header="Talleres" />
                <Column field="tipo" header="Tipo" />
                <Column field="fecha_generacion" header="Fecha Generacion" />
                <Column field="archivo_pdf" header="Archivo PDF" />
                <Column field="usuarios" header="Usuarios" />
                <Column
                    header="Acciones"
                    body={(rowData: Reporte) => (
                        <div>
                            <Button label="Editar" icon="pi pi-pencil" 
                            onClick={() => {
                                setEdittingReporte(rowData)
                                setDisplayDialog(true)}} />
                            <Button label="Eliminar" icon="pi pi-trash" 
                            onClick={async () => {
                                if(rowData.id_reporte !== undefined){
                                    await reporteService.remuve(rowData.id_reporte);
                                    loadReportes();
                                    
                                }}} />
                        </div>
                    )} />
            </DataTable>
            <Dialog
                header="Reporte"
                visible={displayDialog}
                style={{ width: '450vw' }}
                footer={footerDialog()}
                onHide={hideDialog}>
                    <div className="p-field">
                        <label htmlFor="talleres">Talleres</label>
                        <select
                            id="id_taller"
                            className="p-inputtext p-component"
                            value={edittingReporte.talleres}
                            onChange={(e) => setEdittingReporte({ ...edittingReporte, talleres: Number(e.target.value) })}>
                            <option value="">Seleccione un Taller</option>
                            {talleres.map((taller) => (
                                <option key={taller.id_taller} value={taller.id_taller}>
                                    {taller.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="p-field">
                        <label htmlFor="tipo">Tipo</label>
                        <InputText id="tipo" value={edittingReporte.tipo} onChange={(e) => setEdittingReporte({ ...edittingReporte, tipo: e.target.value })} />
                    </div>
                    
                    <div className="p-field">
                        <label htmlFor="archivo_pdf">Archivo PDF</label>
                        <InputText id="archivo_pdf" value={edittingReporte.archivo_pdf} onChange={(e) => setEdittingReporte({ ...edittingReporte, archivo_pdf: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="usuarios">Usuarios</label>
                        <select
                            id="id_usuario"
                            className="p-inputtext p-component"
                            value={edittingReporte.usuarios}
                            onChange={(e) => setEdittingReporte({ ...edittingReporte, usuarios: Number(e.target.value) })}>
                            <option value="">Seleccione un Usuario</option>
                            {usuarios.map((usuario) => (
                                <option key={usuario.id_usuario} value={usuario.id_usuario}>
                                    {usuario.nombre_completo}
                                </option>
                            ))}
                        </select>
                    </div>

            </Dialog>
        </div>
    );
}