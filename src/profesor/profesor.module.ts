import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity/evaluacion.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ProfesorEntity,EvaluacionEntity])],
  providers: [ProfesorService],
  controllers: [ProfesorController],
})
export class ProfesorModule {}
