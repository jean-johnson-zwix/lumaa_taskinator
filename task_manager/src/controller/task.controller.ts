import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TaskService } from 'src/service/task.service';
import { TaskEntity } from 'src/entity/task.entity';
import { Task } from 'src/model/task.model';

@Controller('tasks')
export class TaskController {

    constructor(private taskService: TaskService) {}
    
    @Get()
    async getAllTasks() {
        return await this.taskService.getAllTasks();
    }

    @Post()
    async createTask(@Body() task:Task) {
        return await this.taskService.createTask(task);
    }

    @Put(':id')
    async updateTask(@Param('id') id: number, @Body() task:Task) {
        return await this.taskService.updateTask(id, task);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: number) {
        return await this.taskService.removeTask(id);
    }

}
