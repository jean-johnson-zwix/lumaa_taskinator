"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const task_entity_1 = require("../entity/task.entity");
const user_entity_1 = require("../entity/user.entity");
const task_model_1 = require("../model/task.model");
const typeorm_1 = require("typeorm");
let TaskService = class TaskService {
    dataSource;
    taskRepository;
    userRepository;
    logger = new common_1.Logger();
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.taskRepository = this.dataSource.getRepository(task_entity_1.TaskEntity);
        this.userRepository = this.dataSource.getRepository(user_entity_1.UserEntity);
    }
    mapToModel(taskEntity) {
        return new task_model_1.Task(taskEntity.id, taskEntity.title, taskEntity.description, taskEntity.isComplete, taskEntity.user.userName);
    }
    async getAllTasks() {
        const taskEntityList = await this.taskRepository.find({
            relations: ['user'],
        });
        const taskList = taskEntityList.map((task) => this.mapToModel(task));
        return taskList;
    }
    async createTask(task) {
        try {
            const taskEntity = await this.taskRepository.create(task);
            if (task.userName) {
                const user = await this.userRepository.findOneBy({
                    userName: task.userName,
                });
                if (!user) {
                    throw new common_1.BadRequestException(`There is no user with username: ${task.userName}`);
                }
                else {
                    taskEntity.user = user;
                }
            }
            await this.taskRepository.save(taskEntity);
            console.log(taskEntity);
            return this.mapToModel(taskEntity);
        }
        catch (err) {
            if (err instanceof common_1.BadRequestException) {
                throw err;
            }
            if (err.code == 23505) {
                this.logger.error(err.message, err.stack);
                throw new common_1.HttpException('Duplicate Task', common_1.HttpStatus.CONFLICT);
            }
            this.logger.error(err.message, err.stack);
            throw new common_1.InternalServerErrorException('Something went wrong, Try again!');
        }
    }
    async updateTask(id, task) {
        try {
            const existingTask = await this.taskRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            console.log('line 82', existingTask);
            if (!existingTask) {
                throw new common_1.HttpException('Task does not exist', 404);
            }
            const updatedTask = this.taskRepository.merge(existingTask, task);
            console.log('line 87', updatedTask);
            if (task.userName && task.userName != updatedTask.user.userName) {
                const user = await this.userRepository.findOneBy({
                    userName: task.userName,
                });
                if (!user) {
                    throw new common_1.BadRequestException(`There is no user with username: ${task.userName}`);
                }
                else {
                    updatedTask.user = user;
                }
            }
            console.log(updatedTask);
            await this.taskRepository.save(updatedTask);
            return this.mapToModel(updatedTask);
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            else if (err instanceof common_1.BadRequestException) {
                throw err;
            }
            this.logger.error(err.message, err.stack);
            throw new common_1.InternalServerErrorException('Something went wrong, Try again!');
        }
    }
    async removeTask(id) {
        const existingTask = await this.taskRepository.findOneBy({ id });
        if (!existingTask) {
            throw new common_1.HttpException('Task does not exist', 404);
        }
        return await this.taskRepository.remove(existingTask);
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TaskService);
//# sourceMappingURL=task.service.js.map