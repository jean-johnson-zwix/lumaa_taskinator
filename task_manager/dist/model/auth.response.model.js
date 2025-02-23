"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponse = void 0;
class AuthResponse {
    constructor(authStatus, userName, userId) {
        this.authStatus = authStatus;
        this.userName = userName;
        this.userId = userId;
    }
    authStatus;
    userName;
    userId;
}
exports.AuthResponse = AuthResponse;
//# sourceMappingURL=auth.response.model.js.map