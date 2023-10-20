"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../constants/config");
exports.dbConnection = mongoose_1.default.connect(config_1.DB.host);
mongoose_1.default.connection.on('open', function () {
    console.log('Mongoose connected to ' + config_1.DB.host);
});
mongoose_1.default.connection.on('error', console.error.bind(console, 'connection error:'));
//# sourceMappingURL=db.js.map