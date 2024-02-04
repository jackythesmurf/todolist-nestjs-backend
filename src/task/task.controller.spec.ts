import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entity/task.entity';
import { HttpException } from '@nestjs/common';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const mockTaskService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(), 
      deleteTask: jest.fn(), 
      update: jest.fn(), 
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],

      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with the correct parameters', async () => {
      const dto: CreateTaskDto & Task = {
        id: 'some-id',
        name: 'Test Task',
        description: 'This is a test task',
        startDate: new Date(),
        endDate: new Date(),
        finished: false,
      };

      jest.spyOn(service, 'create').mockResolvedValue(dto);

      expect(await controller.create(dto)).toEqual(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = [
        {
          id: 'some-id',
          name: 'Test Task',
          description: 'This is a test task',
          startDate: new Date(),
          endDate: new Date(),
          finished: false,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);

      expect(service.findAll).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a single task by ID', async () => {
      const task: Task = {
        id: 'some-id',
        name: 'Test Task',
        description: 'This is a test task',
        startDate: new Date(),
        endDate: new Date(),
        finished: false,
      };

      jest.spyOn(service, 'findById').mockResolvedValue(task);

      expect(await controller.findOne('some-id')).toEqual(task);
      expect(service.findById).toHaveBeenCalledWith('some-id');
    });

    it('should throw NotFoundException if task is not found', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(null);

      await expect(controller.findOne('some-id')).rejects.toThrow(
        HttpException,
      );
    });
  });
  describe('delete', () => {
    it('should delete a task', async () => {
      jest.spyOn(service, 'deleteTask').mockResolvedValue(undefined); 

      await expect(controller.delete('some-id')).resolves.toBe(true); 
      expect(service.deleteTask).toHaveBeenCalledWith('some-id');
    });

    it('should throw an error if the delete operation fails', async () => {
      jest
        .spyOn(service, 'deleteTask')
        .mockRejectedValue(new Error('Failed to delete task'));

      await expect(controller.delete('some-id')).rejects.toThrow(HttpException);
    });
  });
  describe('updateTask', () => {
    const updateDto: Partial<CreateTaskDto> = {
      name: 'Updated Test Task',
    };

    it('should update a task and return the updated task', async () => {
      const updateDto: Partial<CreateTaskDto> = {
        name: 'Updated Test Task',
      };

      const updatedTask: Task = {
        id: 'some-id',
        ...updateDto,
        description: 'This is a test task',
        startDate: new Date(),
        endDate: new Date(),
        finished: false,
        name: updateDto.name || 'Default Name',
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedTask);

      expect(await controller.updateTask('some-id', updateDto)).toEqual(
        updatedTask,
      );
      expect(service.update).toHaveBeenCalledWith('some-id', updateDto);
    });

    it('should throw an error if the update operation fails', async () => {
      const updateDto: Partial<CreateTaskDto> = {
        name: 'Updated Test Task',
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new Error('Failed to update task'));

      await expect(controller.updateTask('some-id', updateDto)).rejects.toThrow(
        HttpException,
      );
    });
  });
});
