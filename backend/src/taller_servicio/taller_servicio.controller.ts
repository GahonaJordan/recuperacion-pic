import { Body, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TallerServicio } from "./taller_servicio.entity";
import { TallerServiciosService } from "./taller_servicio.service";

export class TallerServicioController {
    constructor (private readonly tallerServicioService: TallerServiciosService) {}

    @Get()
    findAll(): Promise<TallerServicio[]> {
        return this.tallerServicioService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<TallerServicio> {
        return this.tallerServicioService.findOne(id);
    }

    @Post()
    create(@Body() tallerservicio: TallerServicio): Promise<TallerServicio> {
        return this.tallerServicioService.create(tallerservicio);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() tallerservicio: TallerServicio): Promise<void> {
        return this.tallerServicioService.update(id, tallerservicio);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.tallerServicioService.remove(id);
    }
}