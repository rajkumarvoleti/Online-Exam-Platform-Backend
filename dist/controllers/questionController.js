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
exports.deleteQuestions = exports.deleteQuestion = exports.getQuestion = exports.getQuestions = exports.updateQuestion = exports.createQuestions = exports.createQuestion = void 0;
const questionHandler_1 = require("../handlers/questionHandler");
const db_1 = require("../db");
const createQuestion = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionData, userId } = req.body;
    const res = yield db_1.questionDb.createQuestion({ questionData, userId });
    const question = (0, questionHandler_1.createQuestionData)(res);
    return {
        statusCode: 201,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { question }
    };
});
exports.createQuestion = createQuestion;
const createQuestions = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const questionsData = req.body.questionsData;
    const userId = req.body.userId;
    questionsData.forEach((questionData) => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.questionDb.createQuestion({ questionData, userId });
    }));
    return {
        statusCode: 201,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { msg: "created successfully", topicId: questionsData[0].topicId }
    };
});
exports.createQuestions = createQuestions;
const updateQuestion = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const userId = req.body.userId;
    const questionData = {
        questionId: data.id,
        question: data.questionData.question,
        answer: {
            description: data.questionData.answer.description,
            explanation: data.questionData.answer.explanation,
            options: data.questionData.answer.options,
            type: data.questionData.answer.type,
        },
        complexity: data.questionData.complexity,
        topicId: data.questionData.topicId
    };
    const question = yield db_1.questionDb.editQuestion({ questionData, userId });
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { question }
    };
});
exports.updateQuestion = updateQuestion;
const getQuestions = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = JSON.parse(req.query.topicId);
    if (!id) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: { msg: "Invalid request. Id is not present" }
        };
    }
    const questionsData = yield db_1.questionDb.getQuestions(id);
    const questions = questionsData.map((res, i) => {
        return { question: res.description,
            questionId: res.id,
            questionNumber: i + 1,
            answer: {
                description: res.answer,
                explanation: res.answerExplanation,
                options: res.options.map(opt => { return { description: opt.description, isCorrect: opt.isAnswer }; }),
                type: res.type,
            },
            complexity: res.complexity,
            topicId: res.topicId,
        };
    });
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { questions }
    };
});
exports.getQuestions = getQuestions;
const getQuestion = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = JSON.parse(req.query.questionId);
    console.log(id);
    if (!id) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: { msg: "Invalid request. Id is not present" }
        };
    }
    const res = yield db_1.questionDb.getQuestion(id);
    const question = { question: res.description,
        questionId: res.id,
        answer: {
            description: res.answer,
            explanation: res.answerExplanation,
            options: res.options.map(opt => { return { description: opt.description, isCorrect: opt.isAnswer }; }),
            type: res.type,
        },
        complexity: res.complexity,
        topicId: res.topicId,
    };
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { question }
    };
});
exports.getQuestion = getQuestion;
const deleteQuestion = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    if (!id) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: { msg: "Invalid request. Id is not present" }
        };
    }
    const question = yield db_1.questionDb.deleteQuestion(id);
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { msg: "Deleted Successfully", question }
    };
});
exports.deleteQuestion = deleteQuestion;
const deleteQuestions = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids;
    const topicId = yield db_1.questionDb.deleteQuestions(ids);
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { msg: "Deleted Successfully", topicId }
    };
});
exports.deleteQuestions = deleteQuestions;
//# sourceMappingURL=questionController.js.map