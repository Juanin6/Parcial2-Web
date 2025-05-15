import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { EstudinateService } from './estudinate/estudinate.service';

@Module({
  imports: [EstudianteModule, ProyectoModule, ProfesorModule, EvaluacionModule],
  controllers: [AppController],
  providers: [AppService, EstudinateService],
})
export class AppModule {}
