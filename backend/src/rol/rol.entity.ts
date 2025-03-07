import { UsuarioRol } from 'src/Usuario_Rol/Usuario_Rol.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(() => UsuarioRol, usuarioRol => usuarioRol.roles)
  usuariorol: UsuarioRol[];
}