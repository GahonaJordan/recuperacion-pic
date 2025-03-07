import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { Notificacion } from './notificacion.entity';

@Controller('notificacion')
export class NotificacionController {
  constructor(private readonly notificacionService: NotificacionService) {}

  @Get()
  findAll(): Promise<Notificacion[]> {
    return this.notificacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Notificacion> {
    return this.notificacionService.findOne(id);
  }

  @Post()
  create(@Body() notificacion: Notificacion): Promise<Notificacion> {
    return this.notificacionService.create(notificacion);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() notificacion: Notificacion): Promise<void> {
    return this.notificacionService.update(id, notificacion);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.notificacionService.remove(id);
  }
}