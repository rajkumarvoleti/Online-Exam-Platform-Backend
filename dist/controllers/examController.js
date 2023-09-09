"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = exports.getExam = exports.deleteAllExams = exports.getAllExams = exports.createExam = void 0;
const db_1 = require("../db");
const examHandler_1 = require("../handlers/examHandler");
const createExam = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const testData = req.body.testData;
    const userId = req.body.userId;
    let questionIds = [];
    const topics = testData.testDetails.questionBankTopics;
    yield Promise.all(topics.map((topic) => __awaiter(void 0, void 0, void 0, function* () {
        const newQuestionIds = yield (0, examHandler_1.getQuestionsFromTopic)(topic);
        questionIds = [...questionIds, ...newQuestionIds];
    })));
    const exam = yield db_1.examDb.createExam({ userId, data: testData, questions: questionIds });
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: { exam },
    };
});
exports.createExam = createExam;
const getAllExams = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const exams = yield db_1.examDb.getAllExams();
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: { exams },
    };
});
exports.getAllExams = getAllExams;
const deleteAllExams = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.examDb.deleteAll();
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: { msg: "Deleted Successfully" },
    };
});
exports.deleteAllExams = deleteAllExams;
const getExam = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = JSON.parse(req.query.examId);
    const exam = yield db_1.examDb.getExam(id);
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: { exam },
    };
});
exports.getExam = getExam;
const getResult = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.query.data;
    let score = 0;
    const responses = Object.values(data);
    yield Promise.all(responses.map(({ id, response }) => __awaiter(void 0, void 0, void 0, function* () {
        const answer = yield db_1.questionDb.getAnswer(parseInt(id, 10));
        console.log({ answer, response });
        if (answer === response)
            score = score + 1;
    })));
    console.log(score);
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: { score },
    };
});
exports.getResult = getResult;
//# sourceMappingURL=examController.js.map