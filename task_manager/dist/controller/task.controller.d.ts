import { TaskService } from 'src/service/task.service';
import { Task } from 'src/model/task.model';
import { AuthService } from 'src/service/auth.service';
export declare class TaskController {
    private taskService;
    private authService;
    constructor(taskService: TaskService, authService: AuthService);
    getAllTasks(authHeader: string): Promise<Task[]>;
    createTask(authHeader: string, task: Task): Promise<Task>;
    updateTask(authHeader: string, id: number, task: Task): Promise<Task>;
    deleteTask(authHeader: string, id: number): Promise<any>;
}
