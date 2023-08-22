"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.examSubjectDb = exports.examDb = exports.questionDb = exports.topicDb = exports.subjectDb = exports.userDb = void 0;
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("./user"));
const subject_1 = __importDefault(require("./subject"));
const topic_1 = __importDefault(require("./topic"));
const question_1 = __importDefault(require("./question"));
const exam_1 = __importDefault(require("./exam"));
const examSubject_1 = __importDefault(require("./examSubject"));
const db = new client_1.PrismaClient();
function makeDb() {
    return db;
}
exports.default = makeDb;
exports.userDb = (0, user_1.default)({ makeDb });
exports.subjectDb = (0, subject_1.default)({ makeDb });
exports.topicDb = (0, topic_1.default)({ makeDb });
exports.questionDb = (0, question_1.default)({ makeDb });
exports.examDb = (0, exam_1.default)({ makeDb });
exports.examSubjectDb = (0, examSubject_1.default)({ makeDb });
//# sourceMappingURL=index.js.map