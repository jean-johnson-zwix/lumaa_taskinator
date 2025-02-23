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
const users_service_1 = require("./service/users.service");
const user_controller_1 = require("./controller/user.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [datasource_module_1.TypeOrmModule],
        controllers: [app_controller_1.AppController, task_controller_1.TaskController, user_controller_1.UserController],
        providers: [app_service_1.AppService, users_service_1.UserService, task_service_1.TaskService
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map