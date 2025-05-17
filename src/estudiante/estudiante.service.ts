/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import {  Repository } from 'typeorm';


@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepo : Repository<EstudianteEntity>
    ){}

    async crearEstudiante(estudiante:EstudianteEntity): Promise<EstudianteEntity>{
        if(!(estudiante.promedio> 3.2 ))
            throw new BadRequestException("El promedio es menor o igual a 3.2 ")
        if(estudiante.semestre<4)
            throw new BadRequestException("El Semestre es menor a 4")
        return this.estudianteRepo.save(estudiante);
    }
    async eliminarEstudiante(id:number){
        const estudiante : EstudianteEntity | null = await this.estudianteRepo.findOne({where:{id} ,relations : ["proyectos"]})
        if(!estudiante ){
            throw new NotFoundException("No se encontro estudiante con ese id")
        }
        if(estudiante.proyectos.length>0){
            throw new BadRequestException("No se puede eliminar estudiante con proyectos activos")
        }
        return this.estudianteRepo.remove(estudiante)
    } 
}
