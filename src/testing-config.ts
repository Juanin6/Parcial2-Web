/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante/estudiante.entity/estudiante.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity/proyecto.entity';
import { ProfesorEntity } from './profesor/profesor.entity/profesor.entity';
import { EvaluacionEntity } from './evaluacion/evaluacion.entity/evaluacion.entity';


export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [EstudianteEntity, ProyectoEntity, ProfesorEntity,EvaluacionEntity ],
   synchronize: true,
 }),
 TypeOrmModule.forFeature([EstudianteEntity, ProyectoEntity, ProfesorEntity,EvaluacionEntity ]),
];
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/