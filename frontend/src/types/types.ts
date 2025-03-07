export interface Rol {
    id_rol?: number;
    nombre: string;
    descripcion: string;
}

export interface Usuario {
    id_usuario?: number;
    nombre_completo: string;
    username: string;
    email: string;
    telefono: string;
    fecha_creacion: Date;
    password_hash: string;
    taller: number;
    reportes: Reporte[];

}

export interface UsuarioRol {
    id_usuario_rol?: number;
    usuarios: number;
    roles: number;
    fecha_asignacion: Date;
}

export interface Taller {
    id_taller?: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email_contacto: string;
    horario: string;
    especialidad: string;
    servicios: Registros_Servicio[];
    reportes: Reporte[];
}

export interface Registros_Servicio {
    id_servicio?: number;
    nombre_servicio: string;
    fecha_servicio: Date;
    descripcion: string;
    costo: number;
    tipo_servicio: string;
    kilometraje_servicio: number;
    documento: string;
    fecha_creacion: Date;
    talleres: number;
    vehiculos: number;
}

export interface Vehiculo {
    id_vehiculo?: number;
    marca: string;
    modelo: string;
    año: number;
    numero_placa: string;
    color: string;
    tipo: string;
    ondometro: number;
    estado: string;
    fecha_registro: Date;
    servicios: Registros_Servicio[];
}

export interface Reporte {
    id_reporte?: number;
    talleres: number;
    tipo: string;
    fecha_generacion: Date;
    archivo_pdf: string;
    usuarios: number;
}

export interface Notificacion {
    id_notificacion?: number;
    vehiculos: number;
    descripcion: string;
    fecha_programada: Date;
    estado: string;
}
