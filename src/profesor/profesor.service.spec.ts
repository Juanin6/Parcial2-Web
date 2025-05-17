/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { TypeOrmTestingConfig } from 'src/testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker/.';
import { BadRequestException } from '@nestjs/common';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity/evaluacion.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity/estudiante.entity';


describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository : Repository<ProfesorEntity>
  let repoEvaluacion : Repository<EvaluacionEntity>
  let repoEstudiante : Repository<EstudianteEntity>
  let repoProyecto :Repository<ProyectoEntity>
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity))
    repoEvaluacion = module.get<Repository<EvaluacionEntity>>(getRepositoryToken(EvaluacionEntity))
    repoProyecto = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity))
    repoEstudiante = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity))
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create Profesor (extension equal to 5)', async ()=>{

    const profesor : ProfesorEntity = {
    id: 1,
    cedula: faker.number.int(),
    nombre: faker.person.firstName(),
    departamento: faker.commerce.department(),
    extension: faker.number.int({min:10000,max:99999}),
    esParEvaluado: faker.datatype.boolean(),
    evaluaciones: [],
    mentorias: []
  }
  const profesorCreated: ProfesorEntity = await service.crearProfesor(profesor)
  expect(profesorCreated).not.toBeNull()
  expect(profesorCreated.cedula).toEqual(profesor.cedula)
  expect(profesorCreated.nombre).toEqual(profesor.nombre)
  expect(profesorCreated.departamento).toEqual(profesor.departamento)
  expect(profesorCreated.extension).toEqual(profesor.extension)
  expect(profesorCreated.esParEvaluado).toEqual(profesor.esParEvaluado)
  expect(profesorCreated.evaluaciones).toEqual(profesor.evaluaciones)
  expect(profesorCreated.mentorias).toEqual(profesor.mentorias)

  })

  it("Shouldn't create Profesor (extension different to 5)", async ()=>{

    const profesor : ProfesorEntity = {
    id: 1,
    cedula: faker.number.int(),
    nombre: faker.person.firstName(),
    departamento: faker.commerce.department(),
    extension: faker.number.int({min:100000}),
    esParEvaluado: faker.datatype.boolean(),
    evaluaciones: [],
    mentorias: []
  }
  
  await expect(service.crearProfesor(profesor)).rejects.toThrow(BadRequestException)
  })

  it("Evaluation asign succesfully (Less than 3 evaluations)",async ()=>{
    
    
    const estudiante : EstudianteEntity ={
        id : faker.number.int(),
       promedio : 4,
        programa: faker.lorem.word(),
        semestre:4,
        nombre:faker.person.firstName(),
        cedula : faker.number.int(),
        proyectos: []
     }


    
    const profesor : ProfesorEntity = {
    id: faker.number.int(),
    cedula: faker.number.int(),
    nombre: faker.person.firstName(),
    departamento: faker.commerce.department(),
    extension: faker.number.int(),
    esParEvaluado: faker.datatype.boolean(),
    evaluaciones: [],
    mentorias: []
  }

  const proyecto : ProyectoEntity = {
          id:faker.number.int(),
          titulo:faker.lorem.word(),
          area :faker.commerce.department(),
          presupuesto : faker.number.int(),
          notaFinal : faker.number.int(),
          estado : faker.number.int(),
          fechaInicio : faker.date.anytime.toString(),
          fechaFinal : faker.date.anytime.toString(),
          lider : estudiante,
          mentor: profesor ,
          evaluaciones : []
        
       }
  await repoEstudiante.save(estudiante)
  const profesorCreated : ProfesorEntity = await repository.save(profesor);
  const proyCreated : ProyectoEntity = await repoProyecto.save(proyecto)
  const evaluacion = {
            proyecto :proyCreated,
          }
        
  
  const ev : EvaluacionEntity = await repoEvaluacion.save(evaluacion)
   const profesorAsigned : ProfesorEntity = await service.asignarEvaluador(profesorCreated.id,ev.id)
  
  expect(profesorAsigned).not.toBeNull()

  expect(profesorAsigned.evaluaciones).toHaveLength(1)

  expect (profesorAsigned.evaluaciones[0].id).toEqual(ev.id)
  
  
      

    
  })

  it('Evaluation asign failed (more than 3 evaluations)',async ()=>{

    const estudiante : EstudianteEntity ={
        id : faker.number.int(),
       promedio : 4,
        programa: faker.lorem.word(),
        semestre:4,
        nombre:faker.person.firstName(),
        cedula : faker.number.int(),
        proyectos: []
     }


    
    const profesor : ProfesorEntity = {
    id: faker.number.int(),
    cedula: faker.number.int(),
    nombre: faker.person.firstName(),
    departamento: faker.commerce.department(),
    extension: faker.number.int(),
    esParEvaluado: faker.datatype.boolean(),
    evaluaciones: [],
    mentorias: []
  }

  const proyecto : ProyectoEntity = {
          id:faker.number.int(),
          titulo:faker.lorem.word(),
          area :faker.commerce.department(),
          presupuesto : faker.number.int(),
          notaFinal : faker.number.int({min:1 ,max:4}),
          estado : faker.number.int(),
          fechaInicio : faker.date.anytime.toString(),
          fechaFinal : faker.date.anytime.toString(),
          lider : estudiante,
          mentor: profesor ,
          evaluaciones : []
        
       }


       await repoEstudiante.save(estudiante)
       const profesorCreated: ProfesorEntity = await repository.save(profesor)
       const proyectoCreated : ProyectoEntity = await repoProyecto.save(proyecto)


    for (let index = 0; index < faker.number.int({min:3,max:6}); index++) {
      const evaluacion : EvaluacionEntity = {
          id: faker.number.int(),
          proyecto :proyectoCreated,
          profesor : profesorCreated,
        }
      profesor.evaluaciones.push(await repoEvaluacion.save(evaluacion))
      
      
    }

    const evaluacion :EvaluacionEntity = {
          id: faker.number.int(),
          proyecto :proyectoCreated,
          profesor: profesorCreated,
        }
    const ev : EvaluacionEntity = await repoEvaluacion.save(evaluacion)
    await expect (service.asignarEvaluador(profesorCreated.id , ev.id)).rejects.toThrow(BadRequestException)
    
    
    

  })

});
