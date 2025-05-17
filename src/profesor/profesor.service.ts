/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity/evaluacion.entity';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profeRepo : Repository<ProfesorEntity>,

        @InjectRepository(EvaluacionEntity)
        private readonly evaluacionRepo : Repository<EvaluacionEntity>
        
    ){}
    
    
    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity>{
            if(profesor.extension.toString().length !==5){
                throw new BadRequestException("Extension es diferente de 5 digitos")
            }
            return this.profeRepo.save(profesor)
        }
    async asignarEvaluador(id : number, evId:number ):Promise<ProfesorEntity>{
        const profesor : ProfesorEntity | null = await this.profeRepo.findOne({where:{id},relations:["evaluaciones"]})
        
        if(!profesor){
            throw new NotFoundException("No se encontro con profesor con ese ID")
        }
        if(profesor.evaluaciones.length>=3){
            throw new BadRequestException("El maximo de evaluaciones es menos de 3")
        }
        const evaluacionCreated : EvaluacionEntity | null = await this.evaluacionRepo.findOne({where:{id:evId}})
        if(!evaluacionCreated){
            throw new NotFoundException("No existe evaluacion con ese ID")
        }
        
        const evaluaciones : EvaluacionEntity[] = profesor.evaluaciones
        evaluaciones.push(evaluacionCreated)
        
        
        return this.profeRepo.save({...profesor,... {evaluaciones}} )
        
        
    }
        
}
