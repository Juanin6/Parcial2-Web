/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorDto } from './profesor.dto/profesor.dto';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { plainToInstance } from 'class-transformer';




@Controller('profesor')
export class ProfesorController {
    constructor(private readonly profesorService:ProfesorService){}

    @Post('/create')
    async create(@Body() profesorDto: ProfesorDto){
        const profesorEntity : ProfesorEntity = plainToInstance(ProfesorEntity,profesorDto)
        return await this.profesorService.crearProfesor(profesorEntity)
    }
    @Put('/asign/:id/ev/:evId')
    async asignarEvaluador(@Param("id") id :number, @Param("evId") evId:number){
        
        return await this.profesorService.asignarEvaluador(id,evId)
    }
    

}
