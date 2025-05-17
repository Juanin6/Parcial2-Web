/* eslint-disable prettier/prettier */
import {  IsInt, IsNotEmpty, IsString} from "class-validator";


export class EstudianteDto {

    

    @IsInt()
    @IsNotEmpty()
    promedio : number

    @IsString()
    @IsNotEmpty()
    programa: string

    @IsInt()
    @IsNotEmpty()
    semestre : number

    @IsString()
    @IsNotEmpty()
    nombre : string

    @IsInt()
    @IsNotEmpty()
    cedula : number;




}
