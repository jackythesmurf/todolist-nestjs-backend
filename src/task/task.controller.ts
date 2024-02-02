import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Delete,
  Patch,
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

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    try {
      await this.taskService.deleteTask(id);
      this.logger.log(`Task with ID: ${id} deleted successfully`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to delete task: ${error.message}`, error.stack);
      throw new HttpException(
        'Failed to delete task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: Partial<CreateTaskDto>, // Assuming the CreateTaskDto can be reused for updates
  ): Promise<Task> {
    try {
      const updatedTask = await this.taskService.update(id, updateTaskDto);
      this.logger.log(`Task with ID: ${id} updated successfully`);
      return updatedTask;
    } catch (error) {
      this.logger.error(`Failed to update task: ${error.message}`, error.stack);
      throw new HttpException('Failed to update task', HttpStatus.BAD_REQUEST);
    }
  }
}
