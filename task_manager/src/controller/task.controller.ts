import { Controller, Get, Post, Put, Delete, Param, Body, Headers } from '@nestjs/common';
import { TaskService } from 'src/service/task.service';
import { Task } from 'src/model/task.model';
import { AuthService } from 'src/service/auth.service';

@Controller('tasks')
export class TaskController {

    constructor(private taskService: TaskService, private authService: AuthService) { }

    
    @Get()
    async getAllTasks(@Headers('authorization') authHeader: string) {
        this.authService.authenticate(authHeader)
        return await this.taskService.getAllTasks();
    }

    @Post()
    async createTask(@Headers('authorization') authHeader: string, @Body() task:Task) {
        this.authService.authenticate(authHeader)
        return await this.taskService.createTask(task);
    }

    @Put(':id')
    async updateTask(@Headers('authorization') authHeader: string, @Param('id') id: number, @Body() task: Task) {
        this.authService.authenticate(authHeader)
        return await this.taskService.updateTask(id, task);
    }

    @Delete(':id')
    async deleteTask(@Headers('authorization') authHeader: string, @Param('id') id: number) {
        this.authService.authenticate(authHeader)
        return await this.taskService.removeTask(id);
    }

    

}
