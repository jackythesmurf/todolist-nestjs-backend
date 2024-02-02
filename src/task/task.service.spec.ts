import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

describe('TaskService', () => {
  let service: TaskService;
  let mockRepository: Repository<Task>;

  beforeEach(async () => {
    // Mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            create: jest.fn().mockImplementation((dto) => dto),
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

});
