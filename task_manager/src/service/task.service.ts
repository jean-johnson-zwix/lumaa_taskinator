import {
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { TaskEntity } from 'src/entity/task.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Task } from 'src/model/task.model';
import { DataSource } from 'typeorm';

@Injectable()
export class TaskService {
  private taskRepository;
  private userRepository;
  private logger = new Logger();

  constructor(private dataSource: DataSource) {
    this.taskRepository = this.dataSource.getRepository(TaskEntity);
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  mapToModel(taskEntity: TaskEntity): Task {
    return new Task(
      taskEntity.id,
      taskEntity.title,
      taskEntity.description,
      taskEntity.isComplete,
      taskEntity.user.userName,
    );
  }

  async getAllTasks(): Promise<Task[]> {
    const taskEntityList = await this.taskRepository.find({
      relations: ['user'],
    });
    const taskList = taskEntityList.map((task) => this.mapToModel(task));
    return taskList;
  }

  async createTask(task: Task): Promise<Task> {
    try {
      const user = await this.userRepository.findOneBy({
        userName: task.userName,
      });
      const taskEntity = await this.taskRepository.create(task);
      taskEntity.user = user;
      return this.mapToModel(await this.taskRepository.save(taskEntity));
    } catch (err) {
      if (err.code == 23505) {
        this.logger.error(err.message, err.stack);
        throw new HttpException('Duplicate Task', HttpStatus.CONFLICT);
      }
      this.logger.error(err.message, err.stack);
      throw new InternalServerErrorException(
        'Something went wrong, Try again!',
      );
    }
  }

  async updateTask(id: number, task: Task): Promise<Task> {
    try {
      const existingTask = await this.taskRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!existingTask) {
        throw new HttpException('Task does not exist', 404);
      }
      const updatedTask = this.taskRepository.merge(existingTask, task);
      return this.mapToModel(await this.taskRepository.save(updatedTask));
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      this.logger.error(err.message, err.stack);
      throw new InternalServerErrorException(
        'Something went wrong, Try again!',
      );
    }
  }

  async removeTask(id: number) {
    const existingTask = await this.taskRepository.findOneBy({ id });
    if (!existingTask) {
      throw new HttpException('Task does not exist', 404);
    }
    return await this.taskRepository.remove(existingTask);
  }
}
