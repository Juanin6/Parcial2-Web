/* eslint-disable prettier/prettier */
import { ProyectoEntity } from "src/proyecto/proyecto.entity/proyecto.entity";
import { Column, Entity, Long, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstudianteEntity {

    @PrimaryGeneratedColumn("uuid")
    id:Long

    @Column()
    promedio : number

    @Column()
    programa:string

    @Column()
    semestre : number

    @Column()
    nombre:string

    @Column()
    cedula:number

    @OneToMany(()=>ProyectoEntity,proyecto=>proyecto.lider)
    proyectos : ProyectoEntity[] 

}

