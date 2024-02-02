import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

//   If the entity already exist in the database, it is updated.
//   If the entity does not exist in the database, it is inserted.
  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(createTaskDto);
  }
}
