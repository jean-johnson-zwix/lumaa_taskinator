"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(id, title, description, isComplete, userName) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isComplete = isComplete;
        this.userName = userName;
    }
    id;
    title;
    description;
    isComplete;
    userName;
}
exports.Task = Task;
//# sourceMappingURL=task.model.js.map