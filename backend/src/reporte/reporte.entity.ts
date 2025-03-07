import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Taller} from '../taller/taller.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity('reporte')
export class Reporte {
  @PrimaryGeneratedColumn()
  id_reporte: number;

  @ManyToOne(() => Taller, taller => taller.id_taller)
  talleres: Taller;

  @Column()
  tipo: string;

  @CreateDateColumn()
  fecha_generacion: Date;

  @Column()
  archivo_pdf: string;

  @ManyToOne(() => Usuario, usuario => usuario.id_usuario)
  usuarios: Usuario;

}