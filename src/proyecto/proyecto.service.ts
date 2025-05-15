/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { Long, Repository } from 'typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity/estudiante.entity';

@Injectable()
export class ProyectoService {
     constructor(
            @InjectRepository(ProyectoEntity)
            private readonly proyRepo : Repository<ProyectoEntity>
            
        ){}
    async crearProyecto(proy : ProyectoEntity): Promise<ProyectoEntity>{
        if(!(proy.presupuesto<0) || !(proy.titulo.length<15) ){
            throw new BadRequestException("Mal")
        }
       return this.proyRepo.save(proy)
    }
    async avanzarProyecto(id:Long):Promise<ProyectoEntity>{
        const proy : ProyectoEntity | null = await this.proyRepo.findOne({where:{id}})
        if(!proy){
            throw new NotFoundException("")
        }
        if(proy.estado>0 && proy.estado<4){
            const estado = proy.estado +1
            return this.proyRepo.save({...proy,...{estado}})
        }
        throw new BadRequestException()

    }

    async findAllEstudiantes(id:Long): Promise<EstudianteEntity>{
        const proy : ProyectoEntity | null = await this.proyRepo.findOne({where:{id},relations:["lider"]})
        if(!proy){
            throw new NotFoundException("No se encontro")
        }
        return proy.lider
    }
}
