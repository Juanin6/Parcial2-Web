/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluacionEntity } from './evaluacion.entity/evaluacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvaluacionService {

    constructor(
        @InjectRepository(EvaluacionEntity)
        private readonly evRepo : Repository<EvaluacionEntity>

    ){}
    async crearEvaluacion(ev:EvaluacionEntity): Promise<EvaluacionEntity>{
        if(ev.proyecto.notaFinal>0 && ev.proyecto.notaFinal <5 && ev.proyecto.mentor !== ev.profesor  ){
            return this.evRepo.save(ev)
        }
        throw new BadRequestException("")
    }
}
