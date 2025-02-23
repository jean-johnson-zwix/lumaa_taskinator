import { TaskService } from 'src/service/task.service';
import { Task } from 'src/model/task.model';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    getAllTasks(): Promise<Task[]>;
    createTask(task: Task): Promise<Task>;
    updateTask(id: number, task: Task): Promise<Task>;
    deleteTask(id: number): Promise<any>;
}
