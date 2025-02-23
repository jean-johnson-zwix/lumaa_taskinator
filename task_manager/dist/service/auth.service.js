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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entity/user.entity");
const typeorm_1 = require("typeorm");
const common_2 = require("@nestjs/common");
const auth_response_model_1 = require("../model/auth.response.model");
const auth_util_1 = require("../util/auth.util");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    dataSource;
    jwtService;
    userRepository;
    logger = new common_2.Logger();
    constructor(dataSource, jwtService) {
        this.dataSource = dataSource;
        this.jwtService = jwtService;
        this.userRepository = this.dataSource.getRepository(user_entity_1.UserEntity);
    }
    authenticate(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('No token provided');
        }
        const token = authHeader.split(' ')[1];
        try {
            return this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    async registerUser(user) {
        try {
            const hashedPassword = await (0, auth_util_1.hashPassword)(user.password);
            user.password = hashedPassword;
            const userEntity = await this.userRepository.create(user);
            const savedEntity = await this.userRepository.save(userEntity);
            return {
                id: savedEntity.id,
                userName: savedEntity.userName
            };
        }
        catch (err) {
            if (err.code == 23505) {
                this.logger.error(err.message, err.stack);
                throw new common_2.HttpException('Username is not available', common_2.HttpStatus.CONFLICT);
            }
            this.logger.error(err.message, err.stack);
            throw new common_2.InternalServerErrorException('Something went wrong, Try again!');
        }
    }
    async loginUser(user) {
        try {
            const userName = user.userName;
            const userEntity = await this.userRepository.findOneBy({ userName });
            if (userEntity == null) {
                throw new common_1.BadRequestException('User does not exist');
            }
            if (await (0, auth_util_1.verifyPassword)(user.password, userEntity.password)) {
                const payload = {
                    sub: user.id,
                    username: user.userName,
                };
                const accessToken = this.jwtService.sign(payload);
                return new auth_response_model_1.AuthResponse(accessToken, user.userName, userEntity.id);
            }
            else {
                throw new common_1.UnauthorizedException('The password is incorrect');
            }
        }
        catch (err) {
            if (err instanceof common_1.UnauthorizedException) {
                throw err;
            }
            else {
                this.logger.error(err.message, err.stack);
                throw new common_2.InternalServerErrorException('Something went wrong, Try again!');
            }
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map