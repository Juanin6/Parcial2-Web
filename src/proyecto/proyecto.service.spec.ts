/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { TypeOrmTestingConfig } from 'src/testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker/.';
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProyectoDto } from './proyecto.dto/proyecto.dto';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository : Repository<ProyectoEntity>
  let repoEstudiante : Repository<EstudianteEntity>
  let repoProfesor : Repository<ProfesorEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProyectoService],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity))
    repoEstudiante = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity))
    repoProfesor = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create Proyecto (presupuesto >0 && |titulo|>15) ',async()=>{
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
    
    const proyecto : ProyectoDto = {
          titulo:faker.lorem.words(10),
          area :faker.commerce.department(),
          presupuesto : faker.number.int({min:1}),
          notaFinal : faker.number.int(),
          estado : faker.number.int(),
          fechaInicio : faker.date.anytime.toString(),
          fechaFinal : faker.date.anytime.toString(),
          liderID : estudiante.id,
          mentorID: profesor.id ,
        
       }
       console.log(proyecto.titulo)
       console.log(proyecto.presupuesto)

      await repoEstudiante.save(estudiante)
      await repoProfesor.save(profesor)
      const proyectoCreated : ProyectoEntity = await service.crearProyecto(proyecto)
      expect(proyectoCreated).not.toBeNull()
      expect(proyectoCreated.area).toEqual(proyecto.area)
      expect(proyectoCreated.estado).toEqual(proyecto.estado)
      expect(proyectoCreated.fechaFinal).toEqual(proyecto.fechaFinal)
      expect(proyectoCreated.fechaInicio).toEqual(proyecto.fechaInicio)
      expect(proyectoCreated.notaFinal).toEqual(proyecto.notaFinal)
      expect(proyectoCreated.presupuesto).toEqual(proyecto.presupuesto)
      expect(proyectoCreated.titulo).toEqual(proyecto.titulo)
      expect(proyectoCreated.lider.id).toEqual(proyecto.liderID)
      expect(proyectoCreated.mentor.id).toEqual(proyecto.mentorID)

    
  }) 

  it("Shouldn't create Proyecto (presupuesto <0 ) ",async()=>{
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
    
    const proyecto : ProyectoDto= {
          
          titulo:faker.lorem.words(10),
          area :faker.commerce.department(),
          presupuesto : faker.number.int({min: -1000, max:0}),
          notaFinal : faker.number.int(),
          estado : faker.number.int(),
          fechaInicio : faker.date.anytime.toString(),
          fechaFinal : faker.date.anytime.toString(),
          liderID : estudiante.id,
          mentorID: profesor.id ,
        
       }
       console.log(proyecto.titulo)
       console.log(proyecto.presupuesto)

      await repoEstudiante.save(estudiante)
      await repoProfesor.save(profesor)
      await expect( service.crearProyecto(proyecto)).rejects.toThrow(BadRequestException)

    
  }) 

  it("Advance the proyect sucessfully (estado >0 &&  estado <4)",async()=>{
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
          titulo:faker.lorem.words(10),
          area :faker.commerce.department(),
          presupuesto : faker.number.int(),
          notaFinal : faker.number.int(),
          estado : faker.number.int({min:1,max:3}),
          fechaInicio : faker.date.anytime.toString(),
          fechaFinal : faker.date.anytime.toString(),
          lider : estudiante,
          mentor: profesor ,
          evaluaciones : []
        
       }
    await repoEstudiante.save(estudiante)
    await repoProfesor.save(profesor)
    const createProyecto : ProyectoEntity = await repository.save(proyecto)
    const advanceProyecto : ProyectoEntity = await service.avanzarProyecto(createProyecto.id)
    expect(advanceProyecto).not.toBeNull()
    expect(advanceProyecto.estado).toEqual(createProyecto.estado+1)
  })

  it("Advance the proyect sucessfully (estado>=4)",async()=>{
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
          titulo:faker.lorem.words(10),
          area :faker.commerce.department(),
          presupuesto : faker.number.int(),
          notaFinal : faker.number.int(),
          estado : faker.number.int({min:4}),
          fechaInicio : faker.date.anytime.toString(),
          fechaFinal : faker.date.anytime.toString(),
          lider : estudiante,
          mentor: profesor ,
          evaluaciones : []
        
       }
     await repoEstudiante.save(estudiante)
    await repoProfesor.save(profesor)
    const createProyecto : ProyectoEntity = await repository.save(proyecto)
    await expect(service.avanzarProyecto(createProyecto.id)).rejects.toThrow(BadRequestException)

  })

  it("Should findLider succesfully",async()=>{
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
          titulo:faker.lorem.words(10),
          area :faker.commerce.department(),
          presupuesto : faker.number.int(),
          notaFinal : faker.number.int(),
          estado : faker.number.int({min:4}),
          fechaInicio : faker.date.anytime.toString(),
          fechaFinal : faker.date.anytime.toString(),
          lider : estudiante,
          mentor: profesor ,
          evaluaciones : []
        
       }
      
      await repoEstudiante.save(estudiante)
      await repoProfesor.save(profesor)
      const proyectCreated : ProyectoEntity = await repository.save(proyecto)
      const estudianteFinded: EstudianteEntity = await service.findAllEstudiantes(proyectCreated.id)
      expect(estudianteFinded).not.toBeNull()
      expect(estudiante.cedula).toEqual(estudiante.cedula)
      expect(estudiante.id).toEqual(estudiante.id)
      expect(estudiante.nombre).toEqual(estudiante.nombre)
      expect(estudiante.programa).toEqual(estudiante.programa)
      expect(estudiante.promedio).toEqual(estudiante.promedio)
  
    })  

    it("Shouldn't findLider",async()=>{
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
    
    const proyecto : ProyectoEntity  = {
          id:faker.number.int(),
          titulo:faker.lorem.words(10),
          area :faker.commerce.department(),
          presupuesto : faker.number.int(),
          notaFinal : faker.number.int(),
          estado : faker.number.int({min:4}),
          fechaInicio : faker.date.anytime.toString(),
          fechaFinal : faker.date.anytime.toString(),
          lider: estudiante,
          mentor: profesor ,
          evaluaciones : []
        
       }
    await repoEstudiante.save(estudiante)
      await repoProfesor.save(profesor)
      
      await expect(service.findAllEstudiantes(proyecto.id)).rejects.toThrow(NotFoundException)
    })

});
