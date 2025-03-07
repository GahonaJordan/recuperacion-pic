import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { Reporte } from './reporte.entity';

@Controller('reporte')
export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}

  @Get()
  findAll(): Promise<Reporte[]> {
    return this.reporteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Reporte> {
    return this.reporteService.findOne(id);
  }

  @Post()
  create(@Body() reporte: Reporte): Promise<Reporte> {
    return this.reporteService.create(reporte);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() reporte: Reporte): Promise<void> {
    return this.reporteService.update(id, reporte);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.reporteService.remove(id);
  }
}