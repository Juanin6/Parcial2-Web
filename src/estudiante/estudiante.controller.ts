/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, HttpCode, Param, Post } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './estudiante.dto/estudiante.dto';
import { plainToInstance } from 'class-transformer';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';


@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly estudianteService : EstudianteService){}

    @Post("/create")
    async create(@Body() estudianteDto: EstudianteDto){
        const estudiante : EstudianteEntity = plainToInstance(EstudianteEntity,estudianteDto)
        return await this.estudianteService.crearEstudiante(estudiante)
    }
    @Delete("/:id")
    @HttpCode(204)
    async delete(@Param("id") id : number){
        return await this.estudianteService.eliminarEstudiante(id);
    }

}
