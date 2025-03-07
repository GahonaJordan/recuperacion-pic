import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './vehiculo.entity';
import { Registros_Servicio } from 'src/Registros_Servicio/servicio.entity';


@Injectable()
export class VehiculoService {
  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
  ) {}

  findAll(): Promise<Vehiculo[]> {
    return this.vehiculoRepository.find();
  }

  async findOne(id: number): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoRepository.findOneBy({ id_vehiculo: id });
    if (!vehiculo) {
      throw new Error(`Vehiculo with id ${id} not found`);
    }
    return vehiculo;
  }

  async create(data: Vehiculo): Promise<Vehiculo> {
    return this.vehiculoRepository.save(data);
  }

  async update(id: number, data: Vehiculo): Promise<void> {
    await this.vehiculoRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.vehiculoRepository.delete(id);
  }

}