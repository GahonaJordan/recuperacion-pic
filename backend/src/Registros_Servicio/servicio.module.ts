import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registros_Servicio } from './servicio.entity';
import { ServicioService} from './servicio.service';
import { ServicioController } from './servicio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Registros_Servicio])],
  providers: [ServicioService],
  controllers: [ServicioController],
})
export class ServicioModule {}