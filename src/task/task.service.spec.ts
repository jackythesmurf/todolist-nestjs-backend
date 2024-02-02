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
});
