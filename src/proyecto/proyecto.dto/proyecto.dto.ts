/* eslint-disable prettier/prettier */
import {  IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class ProyectoDto {

    

    @IsString()
    @IsNotEmpty()
    titulo :string

    @IsString()
    @IsNotEmpty()
    area:string

    @IsInt()
    @IsNotEmpty()
    presupuesto : number

    @IsInt()
    @IsNotEmpty()
    notaFinal : number

    @IsInt()
    @IsNotEmpty()
    estado : number

    @IsString()
    @IsNotEmpty()
    fechaInicio : string

    @IsString()
    @IsNotEmpty()
    fechaFinal:string

    @IsNumber()
    @IsNotEmpty()
    mentorID: number

    @IsNumber()
    @IsNotEmpty()
    liderID: number;


}
