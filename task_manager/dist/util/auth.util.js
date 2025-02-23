"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = signToken;
exports.verifyToken = verifyToken;
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET = process.env.JWT_SECRET;
function signToken(user) {
    return jsonwebtoken_1.default.sign(user, SECRET, { expiresIn: '1h' });
}
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, SECRET);
    }
    catch (err) {
        return null;
    }
}
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}
async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
}
//# sourceMappingURL=auth.util.js.map