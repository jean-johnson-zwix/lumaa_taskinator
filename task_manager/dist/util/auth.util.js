"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const bcrypt = require("bcryptjs");
const SECRET = process.env.JWT_SECRET;
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}
async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
}
//# sourceMappingURL=auth.util.js.map