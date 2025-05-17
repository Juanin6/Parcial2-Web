/* eslint-disable prettier/prettier */
import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";


export class ProfesorDto {

    

    @IsInt()
    @IsNotEmpty()
    cedula : number;

    @IsString()
    @IsNotEmpty()
    nombre : string;

    @IsString()
    @IsNotEmpty()
    departamento : string;

    @IsInt()
    @IsNotEmpty()
    extension : number;

    @IsBoolean()
    @IsNotEmpty()
    esParEvaluado :boolean
    

}
