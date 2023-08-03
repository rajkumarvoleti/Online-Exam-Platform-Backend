"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDb = void 0;
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("./user"));
function makeDb() {
    const db = new client_1.PrismaClient();
    return db;
}
exports.default = makeDb;
exports.userDb = (0, user_1.default)({ makeDb });
//# sourceMappingURL=index.js.map