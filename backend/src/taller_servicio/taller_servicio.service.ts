import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TallerServicio } from "./taller_servicio.entity";

export class TallerServiciosService {
    constructor(
        @InjectRepository(TallerServicio)
        private readonly tallerserviceRepository: Repository<TallerServicio>,
     ) {}

    findAll(): Promise<TallerServicio[]> {
        return this.tallerserviceRepository.find();
    }

    async findOne(id: number): Promise<TallerServicio> {
        const tallerservice = await this.tallerserviceRepository.findOne({ where: { id_taller: id } });
        if (!tallerservice) {
            throw new Error(`TallerServicio with id ${id} not found`);
        }
        return tallerservice;
    }

    create(tallerservice: TallerServicio): Promise<TallerServicio> {
        return this.tallerserviceRepository.save(tallerservice);
    }

    async update(id: number, tallerservice: TallerServicio): Promise<void> {
        await this.tallerserviceRepository.update(id, tallerservice);
    }

    async remove(id: number): Promise<void> {
        await this.tallerserviceRepository.delete(id);
    }
}