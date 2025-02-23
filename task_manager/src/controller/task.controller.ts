import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Headers,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from 'src/service/task.service';
import { Task } from 'src/model/task.model';
import { AuthService } from 'src/service/auth.service';

@Controller('tasks')
export class TaskController {
  constructor(
    private taskService: TaskService,
    private authService: AuthService,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe())
  async getAllTasks(@Headers('authorization') authHeader: string) {
    this.authService.authenticate(authHeader);
    return await this.taskService.getAllTasks();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(
    @Headers('authorization') authHeader: string,
    @Body() task: Task,
  ) {
    this.authService.authenticate(authHeader);
    return await this.taskService.createTask(task);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateTask(
    @Headers('authorization') authHeader: string,
    @Param('id') id: number,
    @Body() task: Task,
  ) {
    this.authService.authenticate(authHeader);
    return await this.taskService.updateTask(id, task);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteTask(
    @Headers('authorization') authHeader: string,
    @Param('id') id: number,
  ) {
    this.authService.authenticate(authHeader);
    return await this.taskService.removeTask(id);
  }
}
