"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    passwordSalt: { type: String, required: true, select: false },
    createdAt: { type: Date, default: Date.now },
    emailVerification: { type: Boolean, default: true }, //TODO: implement email verification and change default to false
});
exports.User = mongoose_1.default.model("User", userSchema);
const getUsers = async () => {
    return await exports.User.find({});
};
const getUserByEmail = async (email) => { await exports.User.findOne({ email }); };
const getUserById = async (id) => { await exports.User.findById(id); };
const createUser = async (user) => exports.User.create(user).then((user) => user._id); //TODO this could be wrong
const verifyUserEmail = async (email) => {
    const conditions = { email };
    const update = { $set: { emailVerification: true } };
    exports.User.updateOne(conditions, update, (err, res) => {
        if (err)
            throw err;
        console.log(res);
    });
};
//# sourceMappingURL=user.js.map