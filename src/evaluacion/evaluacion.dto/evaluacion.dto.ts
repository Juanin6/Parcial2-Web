/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber } from "class-validator";


export class EvaluacionDto {
    @IsNumber()
    @IsNotEmpty()
    proyId:number;

    @IsNumber()
    @IsNotEmpty()
    profId:number;
    
}
