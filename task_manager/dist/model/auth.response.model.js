"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponse = void 0;
class AuthResponse {
    constructor(accessToken, userName, userId) {
        this.accessToken = accessToken;
        this.userName = userName;
        this.userId = userId;
    }
    accessToken;
    userName;
    userId;
}
exports.AuthResponse = AuthResponse;
//# sourceMappingURL=auth.response.model.js.map