import { Registros_Servicio } from 'src/Registros_Servicio/servicio.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn} from 'typeorm';
import { Notificacion } from 'src/notificacion/notificacion.entity';

@Entity()
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id_vehiculo: number;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  año: number;

  @Column()
  numero_placa: string;

  @Column()
  color: string;

  @Column()
  tipo: string;

  @Column()
  ondometro: number;

  @Column()
  estado: string;

  @CreateDateColumn()
  fecha_registro: Date;

  @OneToMany(() => Registros_Servicio, servicio => servicio.vehiculos, { cascade: true })
  servicios: Registros_Servicio[];

  @OneToMany(()=> Notificacion, notification => notification.vehiculos)
  notificaciones: Notificacion[];

}