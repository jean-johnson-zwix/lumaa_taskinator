import {
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  BadRequestException,
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
      const taskEntity = await this.taskRepository.create(task);
      if (task.userName) {
        const user = await this.userRepository.findOneBy({
          userName: task.userName,
        });
        console.log(user)
        if (!user) {
          throw new BadRequestException(
            `There is no user with username: ${task.userName}`,
          );
        } else {
          taskEntity.user = user;
        }
      }
      await this.taskRepository.save(taskEntity);
      console.log(taskEntity)
      return this.mapToModel(taskEntity);
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw err
      }
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
      console.log('line 82',existingTask)
      if (!existingTask) {
        throw new HttpException('Task does not exist', 404);
      }
      const updatedTask = this.taskRepository.merge(existingTask, task);
      console.log('line 87',updatedTask)
      if (task.userName && task.userName != updatedTask.user.userName) {
        const user = await this.userRepository.findOneBy({
          userName: task.userName,
        });
        if (!user) {
          throw new BadRequestException(
            `There is no user with username: ${task.userName}`,
          );
        } else {
          updatedTask.user = user;
        }
      }
      console.log(updatedTask)
      await this.taskRepository.save(updatedTask);
      return this.mapToModel(updatedTask);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      else if (err instanceof BadRequestException) {
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
