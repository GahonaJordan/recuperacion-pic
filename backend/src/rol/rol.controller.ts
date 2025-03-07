import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RolService } from './rol.service';
import { Rol } from './rol.entity';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get()
  findAll(): Promise<Rol[]> {
    return this.rolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Rol> {
    return this.rolService.findOne(id);
  }

  @Post()
  create(@Body() rol: Rol): Promise<Rol> {
    return this.rolService.create(rol);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() rol: Rol): Promise<void> {
    return this.rolService.update(id, rol);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.rolService.remove(id);
  }
}