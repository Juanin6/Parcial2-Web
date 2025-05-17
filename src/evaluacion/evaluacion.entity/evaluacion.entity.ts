/* eslint-disable prettier/prettier */
import { ProfesorEntity } from "src/profesor/profesor.entity/profesor.entity";
import { ProyectoEntity } from "src/proyecto/proyecto.entity/proyecto.entity";
import { Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class EvaluacionEntity {
    @PrimaryGeneratedColumn("increment")
    id : number

    @ManyToOne(()=> ProyectoEntity,proyecto => proyecto.evaluaciones)
    proyecto: ProyectoEntity

    @ManyToOne(()=> ProfesorEntity,profesor => profesor.evaluaciones)
    profesor: ProfesorEntity
}
