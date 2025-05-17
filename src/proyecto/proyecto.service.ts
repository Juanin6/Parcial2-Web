/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import {   Repository } from 'typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';
import { ProyectoDto } from './proyecto.dto/proyecto.dto';

@Injectable()
export class ProyectoService {
     constructor(
            @InjectRepository(ProyectoEntity)
            private readonly proyRepo : Repository<ProyectoEntity>,
            @InjectRepository(ProfesorEntity)
            private readonly profRepo : Repository<ProfesorEntity>,
            @InjectRepository(EstudianteEntity)
            private readonly estudianteRepo: Repository<EstudianteEntity>
            
        ){}
    async crearProyecto(proy : ProyectoDto): Promise<ProyectoEntity>{
        const mentor : ProfesorEntity | null = await this.profRepo.findOne({where:{id:proy.mentorID}})
        const lider : EstudianteEntity | null = await this.estudianteRepo.findOne({where:{id:proy.liderID}})

        if(!mentor)
            throw new NotFoundException("No existe mentor con ese ID")
        if(!lider)
            throw new NotFoundException("No existe lider con ese ID")
        if((proy.presupuesto<=0) )
            throw new BadRequestException("Presupuesto menor o igual a 0")
        if(proy.titulo.length<=15)
            throw new BadRequestException("Longitud de titulo menor o igual a 15")
        const proyEntity ={
            ...proy,
            mentor,
            lider
            
        }
       return this.proyRepo.save(proyEntity)
    }
    async avanzarProyecto(id:number):Promise<ProyectoEntity>{
        const proy : ProyectoEntity | null = await this.proyRepo.findOne({where:{id}})
        if(!proy){
            throw new NotFoundException("No se encontro proyecto con ese ID")
        }
        if(proy.estado>=0 && proy.estado<4){
            const estado = proy.estado +1
            return this.proyRepo.save({...proy,...{estado}})
        }
        throw new BadRequestException("Estado no se puede incrementar mas")

    }

    async findAllEstudiantes(id:number): Promise<EstudianteEntity>{
        const proy : ProyectoEntity | null = await this.proyRepo.findOne({where:{id},relations:["lider"]})
        if(!proy){
            throw new NotFoundException("No se encontro el proyecto con ese ID")
        }
        if(!proy.lider){
            throw new NotFoundException("No se encontro lider asignado")
        }
        return proy.lider
    }
}
