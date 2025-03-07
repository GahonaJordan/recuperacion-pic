import { useEffect, useRef, useState } from "react";
import { Taller } from "../types/types";
import { Toast } from "primereact/toast";
import { tallerService } from "../services/tallerService";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export const Talleres: React.FC = () => {
    const [talleres, setTalleres] = useState<Taller[]>([]);
    const toast = useRef<Toast>(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [edittingTaller, setEdittingTaller] = useState<Partial<Taller>>({});
    const [selectedTaller, setSelectedTaller] = useState<Taller>();

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
        loadTalleres();
    }, []);

    const openNew = () => {
        setEdittingTaller({});
        setDisplayDialog(true);
    }

    const hideDialog = () => {
        setDisplayDialog(false);
    }

    const saveTaller = async () => {
        try {
            if (edittingTaller.id_taller) {
                await tallerService.update(edittingTaller.id_taller, edittingTaller);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Taller actualizado exitosamente',
                    life: 3000
                });
            } else {
                await tallerService.create(edittingTaller);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Taller creado exitosamente',
                    life: 3000
                });
            }
            loadTalleres();
            setDisplayDialog(false);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al guardar el taller',
                life: 3000
            });
        }
    }

    const footerDialog = () => {
        return (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={() => { saveTaller(); window.location.reload(); }} />
                <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} />
            </div>
        );
    }

    return (
        <div>
            <Toast ref={toast} />
            <h2>Talleres</h2>
            <Button label="Nuevo" icon="pi pi-plus" onClick={openNew} />
            <DataTable value={talleres} >
                <Column field="id_taller" header="ID"></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="direccion" header="Dirección"></Column>
                <Column field="telefono" header="Teléfono"></Column>
                <Column field="email_contacto" header="Email"></Column>
                <Column field="horario" header="Horario"></Column>
                <Column field="especialidad" header="Especialidad"></Column>
                
                <Column
                    header='Acciones'
                    body={(rowData: Taller) => (
                        <>
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => {
                                setEdittingTaller(rowData);
                                setDisplayDialog(true);
                            }} />
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={async () => {
                                await tallerService.remuve(rowData.id_taller!);
                                loadTalleres();
                                window.location.reload();
                            }} />
                        </>
                    )}
                />
            </DataTable>
            <Dialog 
                visible={displayDialog} 
                style={{ width: '450px' }} 
                header="Taller" modal footer={footerDialog} 
                onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="nombre">Nombre</label>
                    <select id="nombre" className="p-inputtext" value={edittingTaller.nombre} onChange={(e) => setEdittingTaller({ ...edittingTaller, nombre: e.target.value })}>
                        <option value="">Selecciona un nombre</option>
                        <option value="Campo Verde">Campo Verde</option>
                        <option value="La Pradera">La Pradera</option>
                        <option value="El Taller de Juan">El Taller de Juan</option>
                        <option value="Mecánica Rápida">Mecánica Rápida</option>
                        <option value="AutoFix">AutoFix</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="direccion">Dirección</label>
                    <InputText id="direccion" value={edittingTaller.direccion} onChange={(e) => setEdittingTaller({ ...edittingTaller, direccion: e.target.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="telefono">Teléfono</label>
                    <InputText id="telefono" value={edittingTaller.telefono} onChange={(e) => setEdittingTaller({ ...edittingTaller, telefono: e.target.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="email_contacto">Email</label>
                    <InputText id="email_contacto" value={edittingTaller.email_contacto} onChange={(e) => setEdittingTaller({ ...edittingTaller, email_contacto: e.target.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="horario">Horario</label>
                    <select id="horario" className="p-inputtext" value={edittingTaller.horario} onChange={(e) => setEdittingTaller({ ...edittingTaller, horario: e.target.value })}>
                        <option value="">Selecciona un horario</option>
                        <option value="8am - 1pm">8am - 1pm</option>
                        <option value="1pm - 6pm">1pm - 6pm</option>
                        <option value="6pm - 11pm">6pm - 11pm</option>
                        <option value="11pm - 4am">11pm - 4am</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="especialidad" >Especialidad</label>
                    <select id="especialidad" className="p-inputtext" value={edittingTaller.especialidad} onChange={(e) => setEdittingTaller({ ...edittingTaller, especialidad: e.target.value })}>
                        <option value="">Selecciona una Especialidad</option>
                        <option value="Mecánica General">Mecánica General</option>
                        <option value="Electricidad Automotriz">Electricidad Automotriz</option>
                        <option value="Pintura y Carrocería">Pintura y Carrocería</option>
                        <option value="Cambio de Aceite">Cambio de Aceite</option>
                        <option value="Reparación de Frenos">Reparación de Frenos</option>
                        <option value="Alineación y Balanceo">Alineación y Balanceo</option>
                        <option value="Reparación de Transmisiones">Reparación de Transmisiones</option>
                        <option value="Diagnóstico Computarizado">Diagnóstico Computarizado</option>
                        <option value="Reparación de Motores">Reparación de Motores</option>
                        <option value="Servicio de Climatización">Servicio de Climatización</option>
                    </select>
                </div>
            </Dialog>
        </div>
    );
}