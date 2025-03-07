import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registros_Servicio } from './servicio.entity';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Registros_Servicio)
    private readonly servicioRepository: Repository<Registros_Servicio>,
  ) {}

  findAll(): Promise<Registros_Servicio[]> {
    return this.servicioRepository.find();
  }

  async findOne(id: number): Promise<Registros_Servicio> {
    const servicio = await this.servicioRepository.findOne({ 
      where: { id_servicio: id },
    });
    if (!servicio) {
      throw new Error(`Servicio with id ${id} not found`);
    }
    return servicio;
  }

  async create(data: Registros_Servicio): Promise<Registros_Servicio> {
    const now = new Date();

    const newServicio = this.servicioRepository.create({
      ...data,
      vehiculos: data.vehiculos,
      talleres: data.talleres,
      fecha_creacion: now,
    });

    return this.servicioRepository.save(newServicio);
  }

  async update(id: number, data: Registros_Servicio): Promise<void> {
    const now = new Date();

    await this.servicioRepository.update(id, {
      ...data,
      vehiculos: data.vehiculos,
      talleres: data.talleres,
    });
  }

  async remove(id: number): Promise<void> {
    await this.servicioRepository.delete(id);
  }
}
