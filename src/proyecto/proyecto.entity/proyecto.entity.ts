/* eslint-disable prettier/prettier */
import { EstudianteEntity } from "src/estudiante/estudiante.entity/estudiante.entity";
import { EvaluacionEntity } from "src/evaluacion/evaluacion.entity/evaluacion.entity";
import { ProfesorEntity } from "src/profesor/profesor.entity/profesor.entity";
import { Column, Entity,  ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProyectoEntity {

    @PrimaryGeneratedColumn('increment')
    id: number
    
    @Column()
    titulo:string

    @Column()
    area:string

    @Column({type:'int'})
    presupuesto:number

    @Column({type:'int'})
    notaFinal:number;

    @Column({type:'int'})
    estado : number

    @Column()
    fechaInicio : string

    @Column()
    fechaFinal : string

    @ManyToOne(()=>EstudianteEntity,estudiante => estudiante.proyectos, {nullable:false})
    lider : EstudianteEntity

    @ManyToOne(()=> ProfesorEntity,profesor => profesor.mentorias,{nullable:false} )
    mentor : ProfesorEntity

    @OneToMany(()=> EvaluacionEntity ,evaluacion => evaluacion.proyecto)
    evaluaciones : EvaluacionEntity[]




}
