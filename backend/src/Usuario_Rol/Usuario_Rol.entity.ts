import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Rol } from '../rol/rol.entity';

@Entity('usuario-rol')
export class UsuarioRol {
  @PrimaryGeneratedColumn()
  id_usuario_rol: number;

  @ManyToOne(() => Usuario, usuario => usuario.id_usuario)
  usuarios: Usuario;

  @ManyToOne(() => Rol, rol => rol.id_rol)
  roles: Rol;

  @CreateDateColumn()
  fecha_asignacion: Date;
}