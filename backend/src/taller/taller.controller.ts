import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TallerService } from './taller.service';
import { Taller } from './taller.entity';

@Controller('taller')
export class TallerController {
  constructor(private readonly tallerService: TallerService) {}

  @Get()
  findAll(): Promise<Taller[]> {
    return this.tallerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Taller> {
    return this.tallerService.findOne(id);
  }

  @Post()
  create(@Body() taller: Taller): Promise<Taller> {
    return this.tallerService.create(taller);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() taller: Taller): Promise<void> {
    return this.tallerService.update(id, taller);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.tallerService.remove(id);
  }
}