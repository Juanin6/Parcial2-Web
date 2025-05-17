/* eslint-disable prettier/prettier */
import { EvaluacionEntity } from "src/evaluacion/evaluacion.entity/evaluacion.entity";
import { ProyectoEntity } from "src/proyecto/proyecto.entity/proyecto.entity";
import { Column, Entity,  OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProfesorEntity {

    @PrimaryGeneratedColumn('increment')
    id : number

    @Column({type:'int'})
    cedula:number

    @Column()
    nombre:string

    @Column()
    departamento:string

    @Column({type:'int'})
    extension:number

    @Column()
    esParEvaluado : boolean

    @OneToMany(()=> EvaluacionEntity , evaluacion => evaluacion.profesor)
    evaluaciones : EvaluacionEntity[]

    @OneToMany(()=>ProyectoEntity,proyecto => proyecto.mentor)
    mentorias : ProyectoEntity[]

}


