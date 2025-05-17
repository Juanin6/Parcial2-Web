/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluacionEntity } from './evaluacion.entity/evaluacion.entity';
import { Repository } from 'typeorm';
import { EvaluacionDto } from './evaluacion.dto/evaluacion.dto';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';

@Injectable()
export class EvaluacionService {

    constructor(
        @InjectRepository(EvaluacionEntity)
        private readonly evRepo : Repository<EvaluacionEntity>,

        @InjectRepository(ProyectoEntity)
        private readonly proyeRepo : Repository<ProyectoEntity>,

        @InjectRepository(ProfesorEntity)
        private readonly profesorRepo : Repository<ProfesorEntity>

    ){}
    async crearEvaluacion(ev:EvaluacionDto): Promise<EvaluacionEntity>{
        const proyecto : ProyectoEntity | null = await this.proyeRepo.findOne({where:{id:ev.proyId},relations:['mentor']});
        const profesor : ProfesorEntity | null = await this.profesorRepo.findOne({ where: { id: ev.profId } });

        if(!proyecto){
            throw new BadRequestException("El proyecto con ese ID no existe")
        }

        if(!profesor){
            throw new BadRequestException("El profesor con ese ID no existe")
        }

         if (proyecto.mentor.id === profesor.id) {
    throw new BadRequestException('El evaluador no puede ser el mentor del proyecto');
  }

    if (proyecto.notaFinal < 0 || proyecto.notaFinal > 5) {
        throw new BadRequestException('Calificación debe estar entre 0 y 5');
    }

    const evaluacion = this.evRepo.create({
        proyecto,
        profesor,
    });

    return this.evRepo.save(evaluacion);
    }
}
