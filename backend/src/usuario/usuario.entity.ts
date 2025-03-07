import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinColumn } from 'typeorm';
import { Taller } from '../taller/taller.entity';
import { Reporte } from 'src/reporte/reporte.entity';
import { Rol } from 'src/rol/rol.entity';
import { UsuarioRol } from 'src/Usuario_Rol/Usuario_Rol.entity';


@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre_completo: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  telefono: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column()
  password_hash: string;

  @ManyToOne(() => Taller, (taller) => taller.id_taller)
  taller: Taller;

  @OneToMany(()=>Reporte, reporte=>reporte.usuarios)
  reportes: Reporte[];

  @OneToMany(() => UsuarioRol, (rol) => rol.usuarios)
  roles_usuario: UsuarioRol[];

}