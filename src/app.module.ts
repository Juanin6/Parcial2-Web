/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { EvaluacionEntity } from './evaluacion/evaluacion.entity/evaluacion.entity';
import { ProfesorEntity } from './profesor/profesor.entity/profesor.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity/proyecto.entity';
import { EstudianteEntity } from './estudiante/estudiante.entity/estudiante.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // o el tipo de tu base de datos
      host: 'localhost',
      port: 5432, // puerto por defecto de PostgreSQL
      username: 'postgres',
      password: 'juan1234',
      database: 'parcial2_db',
      entities: [
        EstudianteEntity,
        ProyectoEntity,
        ProfesorEntity,
        EvaluacionEntity
      ],
      synchronize: true, // solo para desarrollo (no usar en producción)
    }),
    EstudianteModule,
    ProyectoModule,
    ProfesorModule,
    EvaluacionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}