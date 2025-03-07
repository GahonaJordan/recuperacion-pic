import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  findAll(): Promise<Rol[]> {
    return this.rolRepository.find();
  }

  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findOneBy({ id_rol: id });
    if (!rol) {
      throw new Error(`Rol with id ${id} not found`);
    }
    return rol;
  }

  create(rol: Rol): Promise<Rol> {
    return this.rolRepository.save(rol);
  }

  async update(id: number, rol: Rol): Promise<void> {
    await this.rolRepository.update(id, rol);
  }

  async remove(id: number): Promise<void> {
    await this.rolRepository.delete(id);
  }
}