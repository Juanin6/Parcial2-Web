/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { TypeOrmTestingConfig } from 'src/testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity))
    

    

  });


  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create student succesfully (average >3.2  && semester >=4)',async ()=>{
    const estudiante: EstudianteEntity = {
      id: 0,
      promedio : 4,
      programa: faker.lorem.word(),
      semestre:4,
      nombre:faker.person.firstName(),
      cedula : faker.number.int(),
      proyectos: []
     
   }
   const newEstudiante : EstudianteEntity = await service.crearEstudiante(estudiante);
   expect(newEstudiante).not.toBeNull();

   const storeEstudiante : EstudianteEntity | null = await repository.findOne({where:{id:newEstudiante.id},relations:['proyectos']})
   if(!storeEstudiante){
    throw new Error("No se pudo crear el usuario")
   }
   expect(storeEstudiante).not.toBeNull()
   expect(storeEstudiante.id).not.toBeNull()
   expect(storeEstudiante.cedula).toEqual(newEstudiante.cedula)
   expect(storeEstudiante.programa).toEqual(newEstudiante.programa)
   expect(storeEstudiante.semestre).toEqual(newEstudiante.semestre)
   expect(storeEstudiante.nombre).toEqual(newEstudiante.nombre)
   expect(storeEstudiante.promedio).toEqual(newEstudiante.promedio)
   expect(storeEstudiante.proyectos).toEqual(newEstudiante.proyectos)
  })

  it('should throw BadRequestException when promedio <= 3.2',async ()=>{
    const estudiante: EstudianteEntity = {
      id: 0,
      promedio : 2,
      programa: faker.lorem.word(),
      semestre:4,
      nombre:faker.person.firstName(),
      cedula : faker.number.int(),
      proyectos: []
     
   }
   await expect(service.crearEstudiante(estudiante)).rejects.toThrow(BadRequestException)

   
   
  })

  it('should eliminate student (no active proyects)',async ()=>{
   const estudiante : EstudianteEntity ={
      id : 0,
     promedio : 4,
      programa: faker.lorem.word(),
      semestre:4,
      nombre:faker.person.firstName(),
      cedula : faker.number.int(),
      proyectos: []
   }
   const createdEstudiante : EstudianteEntity = await repository.save(estudiante)
   expect(createdEstudiante).not.toBeNull()
   await service.eliminarEstudiante(createdEstudiante.id)
   const deletedEstudiante = await repository.findOne({where:{id:createdEstudiante.id}})
   expect(deletedEstudiante).toBeNull()

   })

  it("shouldn't eliminate student (active proyects)",async ()=>{

    const mentor = {
    id: 0,
    cedula: faker.number.int(),
    nombre: faker.person.firstName(),
    departamento: faker.commerce.department(),
    extension: faker.number.int(),
    esParEvaluado: faker.datatype.boolean(),
    evaluaciones: [],
    mentorias: []
};

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
    notaFinal : faker.number.int(),
    estado : faker.number.int(),
    fechaInicio : faker.date.anytime.toString(),
    fechaFinal : faker.date.anytime.toString(),
    lider : estudiante,
    mentor ,
    evaluaciones : []


  }
  estudiante.proyectos.push(proyecto)

   
   const createdEstudiante : EstudianteEntity = await repository.save(estudiante)
   expect(createdEstudiante).not.toBeNull()
   jest.spyOn(repository, 'findOne').mockResolvedValueOnce({
  ...estudiante,
  proyectos: [proyecto] 
  } as EstudianteEntity);

   await expect(service.eliminarEstudiante(createdEstudiante.id)).rejects.toThrow(BadRequestException)
   

   })

});
