import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TallerService } from "src/taller/taller.service";
import { TallerServiciosService } from "./taller_servicio.service";
import { TallerServicioController } from "./taller_servicio.controller";

@Module({
    imports: [TypeOrmModule.forFeature([TallerService])],
    providers: [TallerServiciosService],
    controllers: [TallerServicioController],
})
export class TallerServicioModule {}