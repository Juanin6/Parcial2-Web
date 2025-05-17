/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoDto } from './proyecto.dto/proyecto.dto';

@Controller('proyecto')
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService){}

    @Post("/create")
    async create(@Body() proyectoDto : ProyectoDto){
        
        return await this.proyectoService.crearProyecto(proyectoDto)
    }
    @Get("/:id")
    async avanzarProyecto(@Param("id") id :number){
        return await this.proyectoService.avanzarProyecto(id)   
    }
    @Get("/estudiantes/:id")
    async findAllEstudiantes(@Param("id") id:number){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await this.proyectoService.findAllEstudiantes(id);
    }
}
