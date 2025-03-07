import React from "react";
import { Menubar } from 'primereact/menubar';
import { useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {

    const navigare = useNavigate();

    const items = [
        { label: 'Inicio', 
            icon: 'pi pi-fw pi-home', 
            command: () => navigare('/') 
        },
        { label: 'Roles',
            icon: 'pi pi-id-card',
            command: () => navigare('/roles')

        },
        { label: 'Usuarios',
            icon: 'pi pi-users',
            command: () => navigare('/usuarios')

        },
        {
            label: 'Asignar Roles',
            icon: 'pi pi-fw pi-id-card',
            command: () => navigare('/asignarrol')
        },
        { label: 'Talleres',
            icon: 'pi pi-fw pi-cog',
            command: () => navigare('/talleres')
        },
        { label: 'Vehiculos',
            icon: 'pi pi-fw pi-car',
            command: () => navigare('/vehiculos')
        },
        {
            label: 'Servicios del Taller',
            icon: 'pi pi-fw pi-cog',
            command: () => navigare('/servicio_taller')
        },
        {
            label: 'Notificaciones',
            icon: 'pi pi-fw pi-bell',
            command: () => navigare('/notificaciones')
        },
        { label: 'Reportes',
            icon: 'pi pi-fw pi-file',
            command: () => navigare('/reportes')
        },
        { label: 'Dashboard',
            icon: 'pi pi-info',
            command: () => navigare('/dashboard')
        },
    ];

    return <Menubar model={items} />
}