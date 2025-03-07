import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './notificacion.entity';

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionRepository: Repository<Notificacion>,
  ) {}

  findAll(): Promise<Notificacion[]> {
    return this.notificacionRepository.find();
  }

  async findOne(id: number): Promise<Notificacion> {
    const notificacion = await this.notificacionRepository.findOneBy({ id_notificacion: id });
    if (!notificacion) {
      throw new Error(`Notificacion with id ${id} not found`);
    }
    return notificacion;
  }

  async create(notificacion: Notificacion): Promise<Notificacion> {
    const now = new Date();

    const newNotificacion =  this.notificacionRepository.create({
      ...notificacion,
      vehiculos: notificacion.vehiculos,
    });

    return this.notificacionRepository.save(newNotificacion);
  }

  async update(id: number, notificacion: Notificacion): Promise<void> {
    const now = new Date();

    await this.notificacionRepository.update(id, {
      ...notificacion,
      vehiculos: notificacion.vehiculos,
    });
  }

  async remove(id: number): Promise<void> {
    await this.notificacionRepository.delete(id);
  }
}