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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entity/user.entity");
const typeorm_1 = require("typeorm");
const common_2 = require("@nestjs/common");
const auth_response_model_1 = require("../model/auth.response.model");
let UserService = class UserService {
    dataSource;
    userRepository;
    logger = new common_2.Logger();
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.userRepository = this.dataSource.getRepository(user_entity_1.UserEntity);
    }
    async createUser(user) {
        try {
            const userEntity = await this.userRepository.create(user);
            return await this.userRepository.save(userEntity);
        }
        catch (err) {
            if (err.code == 23505) {
                this.logger.error(err.message, err.stack);
                throw new common_2.HttpException('Username already exists', common_2.HttpStatus.CONFLICT);
            }
            this.logger.error(err.message, err.stack);
            throw new common_2.InternalServerErrorException('Something went wrong, Try again!');
        }
    }
    async verifyUser(user) {
        try {
            const userName = user.userName;
            const userEntity = await this.userRepository.findOneBy({ userName });
            if (userEntity == null) {
                throw new common_2.HttpException("User not found", 404);
            }
            if (userEntity.password == user.password) {
                return new auth_response_model_1.AuthResponse("Authorized", user.userName, userEntity.id);
            }
            else {
                throw new common_2.HttpException('Incorrect username or passworc', common_2.HttpStatus.UNAUTHORIZED);
            }
        }
        catch (err) {
            this.logger.error(err.message, err.stack);
            throw new common_2.InternalServerErrorException('Something went wrong, Try again!');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserService);
//# sourceMappingURL=users.service.js.map