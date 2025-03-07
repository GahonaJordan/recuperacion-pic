import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { Registros_Servicio } from './servicio.entity';

@Controller('servicio')
export class ServicioController {
  constructor(private readonly servicioService: ServicioService) {}

  @Get()
  findAll(): Promise<Registros_Servicio[]> {
    return this.servicioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Registros_Servicio> {
    return this.servicioService.findOne(id);
  }

  @Post()
  create(@Body() servicio: Registros_Servicio): Promise<Registros_Servicio> {
    return this.servicioService.create(servicio);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() servicio: Registros_Servicio): Promise<void> {
    return this.servicioService.update(id, servicio);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.servicioService.remove(id);
  }
}