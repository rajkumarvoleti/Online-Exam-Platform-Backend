"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicDb = exports.subjectDb = exports.userDb = void 0;
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("./user"));
const subject_1 = __importDefault(require("./subject"));
const topic_1 = __importDefault(require("./topic"));
function makeDb() {
    const db = new client_1.PrismaClient();
    return db;
}
exports.default = makeDb;
exports.userDb = (0, user_1.default)({ makeDb });
exports.subjectDb = (0, subject_1.default)({ makeDb });
exports.topicDb = (0, topic_1.default)({ makeDb });
//# sourceMappingURL=index.js.map