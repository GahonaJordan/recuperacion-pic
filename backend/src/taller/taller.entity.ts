import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reporte } from 'src/reporte/reporte.entity';
import { Registros_Servicio } from 'src/Registros_Servicio/servicio.entity';
import { Usuario } from 'src/usuario/usuario.entity';



@Entity('taller')
export class Taller {
  @PrimaryGeneratedColumn()
  id_taller: number;

  @Column()
  nombre: string; 

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  email_contacto: string;

  @Column()
  horario: string;

  @Column()
  especialidad: string;

  @OneToMany(() => Registros_Servicio, servicios => servicios.talleres)
  servicios: Registros_Servicio[];
  
  @OneToMany(() => Reporte, reporte => reporte.talleres)
  reportes: Reporte[];

  @OneToMany(() => Usuario, (usuario) => usuario.taller)
  usuarios: Usuario[];
}