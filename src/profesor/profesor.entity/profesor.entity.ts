/* eslint-disable prettier/prettier */
import { EvaluacionEntity } from "src/evaluacion/evaluacion.entity/evaluacion.entity";
import { ProyectoEntity } from "src/proyecto/proyecto.entity/proyecto.entity";
import { Column, Entity, Long, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProfesorEntity {

    @PrimaryGeneratedColumn("uuid")
    id : Long

    @Column()
    cedula:number

    @Column()
    nombre:string

    @Column()
    departamento:string

    @Column()
    extension:number

    @Column()
    esParEvaluado : boolean

    @OneToMany(()=> EvaluacionEntity , evaluacion => evaluacion.profesor)
    evaluaciones : EvaluacionEntity[]

    @OneToMany(()=>ProyectoEntity,proyecto => proyecto.mentor)
    mentorias : ProyectoEntity[]

}


