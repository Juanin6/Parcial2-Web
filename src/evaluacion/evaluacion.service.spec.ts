/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EvaluacionService } from './evaluacion.service';
import { Repository } from 'typeorm';
import { EvaluacionEntity } from './evaluacion.entity/evaluacion.entity';
import { TypeOrmTestingConfig } from 'src/testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker/.';
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { BadRequestException } from '@nestjs/common';
import { EvaluacionDto } from './evaluacion.dto/evaluacion.dto';

describe('EvaluacionService', () => {
  let service: EvaluacionService;
  
  let repoEstudiante : Repository<EstudianteEntity>
  let repoProfesor : Repository<ProfesorEntity>
  let repoProyecto :Repository<ProyectoEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EvaluacionService],
    }).compile();

    service = module.get<EvaluacionService>(EvaluacionService);
    repoEstudiante = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity))
    repoProfesor = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity))
    repoProyecto = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create Evaluacion (Nota final between 0 and 5 , profesor != mentor   )',async ()=>{
    const mentor:ProfesorEntity = {
    id: 0,
    cedula: faker.number.int(),
    nombre: faker.person.firstName(),
    departamento: faker.commerce.department(),
    extension: faker.number.int(),
    esParEvaluado: faker.datatype.boolean(),
    evaluaciones: [],
    mentorias: []
};
  const profesor : ProfesorEntity = {
    id: 1,
    cedula: faker.number.int(),
    nombre: faker.person.firstName(),
    departamento: faker.commerce.department(),
    extension: faker.number.int(),
    esParEvaluado: faker.datatype.boolean(),
    evaluaciones: [],
    mentorias: []
  }

  const estudiante : EstudianteEntity ={
        id : 0,
       promedio : 4,
        programa: faker.lorem.word(),
        semestre:4,
        nombre:faker.person.firstName(),
        cedula : faker.number.int(),
        proyectos: []
     }

   const proyecto : ProyectoEntity = {
      id:0,
      titulo:faker.lorem.word(),
      area :faker.commerce.department(),
      presupuesto : faker.number.int(),
      notaFinal : faker.number.int({min:1 ,max:4}),
      estado : faker.number.int(),
      fechaInicio : faker.date.anytime.toString(),
      fechaFinal : faker.date.anytime.toString(),
      lider : estudiante,
      mentor ,
      evaluaciones : []
    
   }
   
    

    await repoEstudiante.save(estudiante)
    const profCreated: ProfesorEntity =await repoProfesor.save(profesor)
    await repoProfesor.save (mentor)
    const proyCreated : ProyectoEntity = await repoProyecto.save(proyecto)
    const evDTO : EvaluacionDto = {
      proyId : proyCreated.id,
      profId : profCreated.id
    }
    const evaluacionCreated : EvaluacionEntity = await service.crearEvaluacion(evDTO)
    expect(evaluacionCreated).not.toBeNull()
    expect(evaluacionCreated.id).not.toBeNull()
    expect(profCreated.id).toEqual(evaluacionCreated.profesor.id)
    expect(proyCreated.id).toEqual(evaluacionCreated.proyecto.id)

  })

  it("shouldn't create Evaluacion (Nota final greater to 5)",async ()=>{
    const mentor:ProfesorEntity = {
    id: 0,
    cedula: faker.number.int(),
    nombre: faker.person.firstName(),
    departamento: faker.commerce.department(),
    extension: faker.number.int(),
    esParEvaluado: faker.datatype.boolean(),
    evaluaciones: [],
    mentorias: []
};
  const profesor : ProfesorEntity = {
    id: 1,
    cedula: faker.number.int(),
    nombre: faker.person.firstName(),
    departamento: faker.commerce.department(),
    extension: faker.number.int(),
    esParEvaluado: faker.datatype.boolean(),
    evaluaciones: [],
    mentorias: []
  }

  const estudiante : EstudianteEntity ={
        id : 0,
       promedio : 4,
        programa: faker.lorem.word(),
        semestre:4,
        nombre:faker.person.firstName(),
        cedula : faker.number.int(),
        proyectos: []
     }

   const proyecto : ProyectoEntity = {
      id:0,
      titulo:faker.lorem.word(),
      area :faker.commerce.department(),
      presupuesto : faker.number.int(),
      notaFinal : faker.number.int({min:6}),
      estado : faker.number.int(),
      fechaInicio : faker.date.anytime.toString(),
      fechaFinal : faker.date.anytime.toString(),
      lider : estudiante,
      mentor ,
      evaluaciones : []
    
   }

    await repoEstudiante.save(estudiante)
    const prof:ProfesorEntity= await repoProfesor.save(profesor)
    await repoProfesor.save (mentor)
    const proy : ProyectoEntity =await repoProyecto.save(proyecto)
    
    const evDTO : EvaluacionDto = {
      proyId: proy.id,
      profId : prof.id
    }
    await expect( service.crearEvaluacion(evDTO)).rejects.toThrow(BadRequestException)

  })


});
