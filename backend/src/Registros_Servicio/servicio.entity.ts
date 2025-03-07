import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Taller } from '../taller/taller.entity';
import { Vehiculo } from '../Vehiculo/vehiculo.entity';

@Entity('servicio')
export class Registros_Servicio{
  @PrimaryGeneratedColumn()
  id_servicio: number;

  @Column()
  nombre_servicio: string;

  @Column()
  fecha_servicio: Date;

  @Column()
  descripcion: string;

  @Column()
  costo: number;

  @Column()
  tipo_servicio: string;

  @Column()
  kilometraje_servicio: number;

  @Column()
  documento: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @ManyToOne(() => Taller, taller => taller.id_taller)
  talleres: Taller;

  @ManyToOne(() => Vehiculo, vehiculo => vehiculo.id_vehiculo)
  vehiculos: Vehiculo;

  
  
}