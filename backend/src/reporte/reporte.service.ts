import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reporte } from './reporte.entity';

@Injectable()
export class ReporteService {
  constructor(
    @InjectRepository(Reporte)
    private readonly reporteRepository: Repository<Reporte>,
  ) {}

  findAll(): Promise<Reporte[]> {
    return this.reporteRepository.find();
  }

  async findOne(id: number): Promise<Reporte> {
    const reporte = await this.reporteRepository.findOneBy({ id_reporte: id });
    if (!reporte) {
      throw new Error(`Reporte with id ${id} not found`);
    }
    return reporte;
  }

  async create(reporte: Reporte): Promise<Reporte> {
    const now = new Date();

    const newReporte = this.reporteRepository.create({
      ...reporte,
      talleres: reporte.talleres,
      usuarios: reporte.usuarios,
      fecha_generacion: now,
    });

    return this.reporteRepository.save(newReporte);
  }

  async update(id: number, reporte: Reporte): Promise<void> {
    const now = new Date();

    await this.reporteRepository.update(id, {
      ...reporte,
      talleres: reporte.talleres,
      usuarios: reporte.usuarios,
    });
  }

  async remove(id: number): Promise<void> {
    await this.reporteRepository.delete(id);
  }
}