import { TaskEntity } from 'src/entity/task.entity';
import { Task } from 'src/model/task.model';
import { DataSource } from 'typeorm';
export declare class TaskService {
    private dataSource;
    private taskRepository;
    private userRepository;
    private logger;
    constructor(dataSource: DataSource);
    mapToModel(taskEntity: TaskEntity): Task;
    getAllTasks(): Promise<Task[]>;
    createTask(task: Task): Promise<Task>;
    updateTask(id: number, task: Task): Promise<Task>;
    removeTask(id: number): Promise<any>;
}
