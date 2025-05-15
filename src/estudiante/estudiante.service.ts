/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { Long, Repository } from 'typeorm';


@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepo : Repository<EstudianteEntity>
    ){}

    async crearEstudiante(estudiante:EstudianteEntity): Promise<EstudianteEntity>{
        if(!(estudiante.promedio> 3.2 && estudiante.semestre >=4))
            throw new BadRequestException("")
        return this.estudianteRepo.save(estudiante);
    }
    async eliminarEstudiante(id:Long){
        const estudiante : EstudianteEntity | null = await this.estudianteRepo.findOne({where:{id} ,relations : ["proyectos"]})
        if(!estudiante ){
            throw new NotFoundException("No se encontro con ese id")
        }
        if(estudiante.proyectos.length>0){
            throw new BadRequestException()
        }
        return this.estudianteRepo.remove(estudiante)
    } 
}
