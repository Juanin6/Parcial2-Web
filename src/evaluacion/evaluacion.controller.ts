/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionDto } from './evaluacion.dto/evaluacion.dto';


@Controller('evaluacion')
export class EvaluacionController {
    constructor(private readonly evaluacionService : EvaluacionService){}

    @Post('/create')
    async create(@Body() evaluacionDto : EvaluacionDto ){
        
        return await this.evaluacionService.crearEvaluacion(evaluacionDto)
    }
    
}
