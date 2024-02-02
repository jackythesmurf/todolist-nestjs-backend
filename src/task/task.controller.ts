import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entity/task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  private readonly logger = new Logger(TaskController.name);

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const task = await this.taskService.create(createTaskDto);
      this.logger.log(`Task created successfully with ID: ${task.id}`);
      return task;
    } catch (error) {
      this.logger.error(`Failed to create task: ${error.message}`, error.stack);
      throw new HttpException('Failed to create task', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.taskService.findAll();
      this.logger.log(`Retrieved all tasks successfully`);
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to retrieve tasks: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to retrieve tasks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    try {
      const task = await this.taskService.findById(id);
      if (!task) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      this.logger.log(`Retrieved task successfully with ID: ${id}`);
      return task;
    } catch (error) {
      this.logger.error(
        `Failed to retrieve task: ${error.message}`,
        error.stack,
      );
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Failed to retrieve task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
