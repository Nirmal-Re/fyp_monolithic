"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHashedPassword = void 0;
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
//# sourceMappingURL=index.js.map