import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { Notificacion } from './notificacion/notificacion.entity';
import { Vehiculo } from './Vehiculo/vehiculo.entity';
import { VehiculoModule } from './Vehiculo/vehiculo.module';
import { NotificacionModule } from './notificacion/notificacion.module';
import { TallerModule } from './taller/taller.module';
import { ServicioModule } from './Registros_Servicio/servicio.module';
import { ReporteModule } from './reporte/reporte.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioRolModule } from './Usuario_Rol/Usuario_Rol.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: '123',
      database: 'db_recuperacion',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    RolModule,
    NotificacionModule,
    VehiculoModule,
    TallerModule,
    TallerModule,
    ReporteModule,
    UsuarioModule,
    UsuarioRolModule,
    ServicioModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
