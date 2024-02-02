import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  private readonly logger = new Logger(TaskController.name);
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      // Attempt to create a task using the provided DTO
      const task = await this.taskService.create(createTaskDto);
      this.logger.log(`Task created successfully with ID: ${task.id}`);
      return task;
    } catch (error) {
      // Log the error and throw an HTTP exception
      this.logger.error(`Failed to create task: ${error.message}`, error.stack);
      throw new HttpException('Failed to create task', HttpStatus.BAD_REQUEST);
    }
  }
}
