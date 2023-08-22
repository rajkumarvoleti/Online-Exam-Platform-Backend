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
exports.getExam = exports.deleteAllExams = exports.getAllExams = exports.createExam = void 0;
const examHandler_1 = require("../handlers/examHandler");
const db_1 = require("../db");
const createExam = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { testData } = req.body;
    let examSubjects = [];
    yield Promise.all(testData.subjects.map((subject, i) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedSubject = yield (0, examHandler_1.getRandomQuestionsSubject)(subject);
        examSubjects = [...examSubjects, updatedSubject];
    })));
    const examSubjectIds = yield (0, examHandler_1.createExamSubjects)(examSubjects);
    const examDetails = {
        description: testData.description,
        name: testData.name,
        subjectIds: examSubjectIds,
        testAvailabilityStart: new Date(),
        testAvailabilityEnd: new Date(),
        totalMarks: testData.totalMarks,
        totalQuestions: testData.totalQuestions,
        totalTime: testData.totalTime,
        userId: testData.userId,
    };
    const exam = yield db_1.examDb.createExam(examDetails);
    return {
        statusCode: 201,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { exam }
    };
});
exports.createExam = createExam;
const getAllExams = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const exams = yield db_1.examDb.getAllExams();
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { exams }
    };
});
exports.getAllExams = getAllExams;
const deleteAllExams = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.examDb.deleteAll();
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { msg: "Deleted Successfully" }
    };
});
exports.deleteAllExams = deleteAllExams;
const getExam = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = JSON.parse(req.query.examId);
    const exam = yield db_1.examDb.getExam(id);
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { exam }
    };
});
exports.getExam = getExam;
//# sourceMappingURL=examController.js.map