/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity/evaluacion.entity';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profeRepo : Repository<ProfesorEntity>
        
    ){}
    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity>{
            if(profesor.extension.toString.length !==5){
                throw new BadRequestException("")
            }
            return this.profeRepo.save(profesor)
        }
    async asignarEvaluador(id : Long, evaluacion:EvaluacionEntity ){
        const profesor : ProfesorEntity | null = await this.profeRepo.findOne({where:{id},relations:["evluaciones"]})
        
        if(!profesor){
            throw new NotFoundException("No se encontro")
        }
        if(profesor.evaluaciones.length>3){
            throw new BadRequestException("")
        }
        const evaluaciones : EvaluacionEntity[] = profesor.evaluaciones
        evaluaciones.push(evaluacion)
        
        return await this.profeRepo.save({...profesor,... {evaluaciones}})
        
        
    }
        
}
