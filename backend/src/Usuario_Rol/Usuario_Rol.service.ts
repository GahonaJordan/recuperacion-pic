import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioRol } from './Usuario_Rol.entity';

@Injectable()
export class UsuarioRolService {
  constructor(
    @InjectRepository(UsuarioRol)
    private readonly usuarioRolRepository: Repository<UsuarioRol>,
  ) {}

  findAll(): Promise<UsuarioRol[]> {
    return this.usuarioRolRepository.find();
  }

  async findOne(id: number): Promise<UsuarioRol> {
    const usuarioRol = await this.usuarioRolRepository.findOneBy({ id_usuario_rol: id });
    if (!usuarioRol) {
      throw new Error(`UsuarioRol with id ${id} not found`);
    }
    return usuarioRol;
  }

  create(usuarioRol: UsuarioRol): Promise<UsuarioRol> {
    const now = new Date();

    const newUsuarioRol =  this.usuarioRolRepository.create({
      ...usuarioRol,
      usuarios: usuarioRol.usuarios,
      roles: usuarioRol.roles,
    });

    return this.usuarioRolRepository.save(newUsuarioRol);
  }

  async update(id: number, usuarioRol: UsuarioRol): Promise<void> {
    const now = new Date();

    await this.usuarioRolRepository.update(id, {
      ...usuarioRol,
      usuarios: usuarioRol.usuarios,
      roles: usuarioRol.roles,
    });
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRolRepository.delete(id);
  }
}