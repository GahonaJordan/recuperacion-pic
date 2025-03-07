import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuarioRolService } from './Usuario_Rol.service';
import { UsuarioRol } from './Usuario_Rol.entity';

@Controller('usuario-rol')
export class UsuarioRolController {
  constructor(private readonly usuarioRolService: UsuarioRolService) {}

  @Get()
  findAll(): Promise<UsuarioRol[]> {
    return this.usuarioRolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UsuarioRol> {
    return this.usuarioRolService.findOne(id);
  }

  @Post()
  create(@Body() usuarioRol: UsuarioRol): Promise<UsuarioRol> {
    return this.usuarioRolService.create(usuarioRol);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() usuarioRol: UsuarioRol): Promise<void> {
    return this.usuarioRolService.update(id, usuarioRol);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usuarioRolService.remove(id);
  }
}