/* eslint-disable prettier/prettier */

import { ProyectoEntity } from "src/proyecto/proyecto.entity/proyecto.entity";
import { Column, Entity,  OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class EstudianteEntity {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({type:'int'})
    promedio : number

    @Column()
    programa:string

    @Column({type:'int'})
    semestre : number

    @Column()
    nombre:string

    @Column({type:'int'})
    cedula:number

    @OneToMany(()=>ProyectoEntity,proyecto=>proyecto.lider)
    proyectos : ProyectoEntity[] 

}

