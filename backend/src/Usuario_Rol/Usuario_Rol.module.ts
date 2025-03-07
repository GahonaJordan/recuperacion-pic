import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRol } from './Usuario_Rol.entity';
import { UsuarioRolService } from './Usuario_Rol.service';
import { UsuarioRolController } from './Usuario_Rol.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioRol])],
  providers: [UsuarioRolService],
  controllers: [UsuarioRolController],
})
export class UsuarioRolModule {}