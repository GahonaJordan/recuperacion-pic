import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taller } from './taller.entity';

@Injectable()
export class TallerService {
  constructor(
    @InjectRepository(Taller)
    private readonly tallerRepository: Repository<Taller>,
  ) {}

  findAll(): Promise<Taller[]> {
    return this.tallerRepository.find();
  }

  async findOne(id: number): Promise<Taller> {
    const taller = await this.tallerRepository.findOneBy({ id_taller: id });
    if (!taller) {
      throw new Error(`Taller with id ${id} not found`);
    }
    return taller;
  }

  create(taller: Taller): Promise<Taller> {
    return this.tallerRepository.save(taller);
  }

  async update(id: number, taller: Taller): Promise<void> {
    await this.tallerRepository.update(id, taller);
  }

  async remove(id: number): Promise<void> {
    await this.tallerRepository.delete(id);
  }
}