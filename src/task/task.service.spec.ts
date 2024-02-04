import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';

describe('TaskService', () => {
  let service: TaskService;
  let mockRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
            create: jest.fn().mockImplementation((dto) => dto),
            merge: jest.fn((entity, dto) => ({ ...entity, ...dto })), // Mock implementation for merge
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    mockRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save a task', async () => {
      const createTaskDto: CreateTaskDto = {
        name: 'Test Task',
        description: 'This is a test',
        startDate: new Date(),
        endDate: new Date(),
        finished: false,
      };
      const expectedResult = { ...createTaskDto, id: 'a-uuid' };

      jest.spyOn(mockRepository, 'save').mockResolvedValue(expectedResult);

      expect(await service.create(createTaskDto)).toEqual(expectedResult);
      expect(mockRepository.save).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = [
        {
          id: 'some-id',
          name: 'Task One',
          description: 'This is task one',
          startDate: new Date('2020-01-01T00:00:00Z'),
          endDate: new Date('2020-01-02T00:00:00Z'),
          finished: false,
        },
        {
          id: 'another-id',
          name: 'Task Two',
          description: 'This is task two',
          startDate: new Date('2020-02-01T00:00:00Z'),
          endDate: new Date('2020-02-02T00:00:00Z'),
          finished: true,
        },
      ];

      jest.spyOn(mockRepository, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });
  describe('findById', () => {
    it('should return a task if it is found', async () => {
      const testId = 'test-id';
      const testTask: Task = {
        id: testId,
        name: 'Test Task',
        description: 'Test Description',
        startDate: new Date(),
        endDate: new Date(),
        finished: false,
      };

      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(testTask);

      const result = await service.findById(testId);
      expect(result).toEqual(testTask);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: testId });
    });

    it('should throw NotFoundException if the task is not found', async () => {
      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(service.findById('non-existing-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('deleteTask', () => {
    it('should successfully delete a task if it is found', async () => {
      
      const mockTask: Task = {
        id: 'test-id',
        name: 'Task Name',
        description: 'Task Description',
        startDate: new Date(),
        endDate: new Date(),
        finished: false,
      };

      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(mockTask);
      jest.spyOn(mockRepository, 'delete').mockResolvedValue({
        affected: 1,
        raw: {}, 
      });


      await service.deleteTask('test-id');
      expect(mockRepository.delete).toHaveBeenCalledWith('test-id');
    });


    it('should throw NotFoundException if the task is not found', async () => {
      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(service.deleteTask('non-existing-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('update', () => {
    it('should update a task if it is found', async () => {
      const testId = 'test-id';
      const updateTaskDto: Partial<CreateTaskDto> = { name: 'Updated Name' };
      const initialTask: Task = {
        id: testId,
        name: 'Original Name',
        description: 'Test Description',
        startDate: new Date(),
        endDate: new Date(),
        finished: false,
      };
      const updatedTask = { ...initialTask, ...updateTaskDto };

      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(initialTask);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(updatedTask);

      const result = await service.update(testId, updateTaskDto);
      expect(result).toEqual(updatedTask);
      expect(mockRepository.save).toHaveBeenCalledWith(updatedTask);
    });

    it('should throw NotFoundException if the task to update is not found', async () => {
      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(service.update('non-existing-id', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });



  
});
