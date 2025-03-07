import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from './vehiculo.entity';
import { VehiculoService } from './vehiculo.service';
import { VehiculoController } from './vehiculo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vehiculo])],
  providers: [VehiculoService],
  controllers: [VehiculoController],
})
export class VehiculoModule {}