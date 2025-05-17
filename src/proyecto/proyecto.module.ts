/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity,ProfesorEntity,EstudianteEntity])],
  providers: [ProyectoService],
  controllers: [ProyectoController],
})
export class ProyectoModule {}
