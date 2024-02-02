import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entity/task.entity';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const mockTaskService = {
      create: jest.fn(),
      findAll: jest.fn(),
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

      // Mock the service method to avoid actual implementation
      jest.spyOn(service, 'create').mockResolvedValue(dto);

      // Execute the controller method
      expect(await controller.create(dto)).toEqual(dto);

      // Verify the service method was called with the correct parameter
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
});
