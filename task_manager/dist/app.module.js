"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./controller/app.controller");
const app_service_1 = require("./service/app.service");
const task_controller_1 = require("./controller/task.controller");
const datasource_module_1 = require("./datasource/datasource.module");
const task_service_1 = require("./service/task.service");
const auth_service_1 = require("./service/auth.service");
const auth_controller_1 = require("./controller/auth.controller");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [datasource_module_1.TypeOrmModule,
            config_1.ConfigModule.forRoot(),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '60m' },
            }),
        ],
        controllers: [app_controller_1.AppController, task_controller_1.TaskController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService, auth_service_1.AuthService, task_service_1.TaskService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map