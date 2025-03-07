import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Vehiculo } from 'src/Vehiculo/vehiculo.entity';

@Entity('notificacion')
export class Notificacion {
  @PrimaryGeneratedColumn()
  id_notificacion: number;

  @ManyToOne(() => Vehiculo, vehiculo => vehiculo.id_vehiculo)
  vehiculos: Vehiculo;

  @Column()
  descripcion: string;

  @Column()
  fecha_programada: Date; 

  @Column()
  estado: string;
}