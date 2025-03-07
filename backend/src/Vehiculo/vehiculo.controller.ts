import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './vehiculo.entity';

@Controller('vehiculo')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Get()
  findAll(): Promise<Vehiculo[]> {
    return this.vehiculoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Vehiculo> {
    return this.vehiculoService.findOne(id);
  }

  @Post()
  create(@Body() data: Vehiculo): Promise<Vehiculo> {
    return this.vehiculoService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() vehiculo: Vehiculo): Promise<void> {
    return this.vehiculoService.update(id, vehiculo);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.vehiculoService.remove(id);
  }
}