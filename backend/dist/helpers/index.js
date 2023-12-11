"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionToken = exports.startAndEndOfDay = exports.comparePassword = exports.createHashedPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const createHashedPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        return hashedPassword;
    }
    catch {
        return { error: "Error with hashing password" };
    }
};
exports.createHashedPassword = createHashedPassword;
const comparePassword = async (password, hashedPassword) => {
    try {
        const result = await bcrypt_1.default.compare(password, hashedPassword);
        return result;
    }
    catch {
        return { error: "Error with comparing password" };
    }
};
exports.comparePassword = comparePassword;
const startAndEndOfDay = () => {
    return [new Date(new Date().setHours(0, 0, 0, 0)), new Date(new Date().setHours(23, 59, 59, 999))]; //[startofday, endofday]
};
exports.startAndEndOfDay = startAndEndOfDay;
const createSessionToken = async (user_id) => { };
exports.createSessionToken = createSessionToken;
//# sourceMappingURL=index.js.map