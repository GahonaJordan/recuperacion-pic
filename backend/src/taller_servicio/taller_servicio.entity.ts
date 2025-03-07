import { Registros_Servicio } from "src/Registros_Servicio/servicio.entity";
import { Taller } from "src/taller/taller.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class TallerServicio {

    @PrimaryGeneratedColumn()
    id_taller_servicio: number;

    @ManyToOne(() => Taller, taller => taller.id_taller)
    id_taller: number;

    @ManyToOne(() => Registros_Servicio, servicio => servicio.id_servicio)
    id_servicio: number;

    @Column()
    fecha_asignacion: Date;
}