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
exports.deleteSubject = exports.updateSubject = exports.getSubject = exports.getAllQuestionBanks = exports.getAllSubjects = exports.createSubjectAndTopics = exports.createSubject = void 0;
const db_1 = require("../db");
const createSubject = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log({ userId: data.userId });
    const subjectData = {
        name: data.subjectData.name,
        description: data.subjectData.description,
        topicsCount: 0,
    };
    const subject = yield db_1.subjectDb.createSubject({ subjectData, userId: data.userId });
    return {
        statusCode: 201,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { subject }
    };
});
exports.createSubject = createSubject;
const createSubjectAndTopics = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const subjectAndTopics = yield db_1.subjectDb.createSubjectAndTopics({ data: data.subjectTopicsData, userId: data.userId });
    return {
        statusCode: 201,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { subjectAndTopics }
    };
});
exports.createSubjectAndTopics = createSubjectAndTopics;
const getAllSubjects = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.subjectDb.getAllSubjects();
    const subjects = data.map(subject => {
        return {
            description: subject.description,
            name: subject.name,
            topicsCount: subject._count.topics,
            id: subject.id
        };
    });
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { subjects }
    };
});
exports.getAllSubjects = getAllSubjects;
const getAllQuestionBanks = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.subjectDb.getAllQuestionBanks();
    // console.log(data);
    const questionBanks = data.map(subject => {
        return {
            id: subject.id,
            name: subject.name,
            totalQuestions: subject.topics.map(topic => topic.questions.length).reduce((prev, curr) => prev + curr, 0),
            easyQuestionsCount: subject.topics.map(topic => topic.questions.filter(question => question.complexity === "easy").length).reduce((prev, curr) => prev + curr, 0),
            mediumQuestionsCount: subject.topics.map(topic => topic.questions.filter(question => question.complexity === "medium").length).reduce((prev, curr) => prev + curr, 0),
            hardQuestionsCount: subject.topics.map(topic => topic.questions.filter(question => question.complexity === "hard").length).reduce((prev, curr) => prev + curr, 0),
        };
    });
    console.log(questionBanks);
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { questionBanks }
    };
});
exports.getAllQuestionBanks = getAllQuestionBanks;
const getSubject = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = JSON.parse(req.query.subjectId);
    const data = yield db_1.subjectDb.getSubject(id);
    const subject = {
        id: data.id,
        description: data.description,
        name: data.name,
        topicsCount: data._count.topics,
    };
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { subject }
    };
});
exports.getSubject = getSubject;
const updateSubject = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectData, id } = req.body;
    console.log({ subjectData, id });
    const subject = yield db_1.subjectDb.editSubject({ subjectData, id });
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { subject }
    };
});
exports.updateSubject = updateSubject;
const deleteSubject = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    if (!id) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: { error: "Invalid request. Id is not present" }
        };
    }
    const topics = yield db_1.subjectDb.getTopics(id);
    if (topics.topics.length !== 0) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: { error: "Cannot delete the subject. Please delete the chapters in it first" }
        };
    }
    yield db_1.subjectDb.deleteSubject(id);
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { msg: "Deleted Successfully" }
    };
});
exports.deleteSubject = deleteSubject;
//# sourceMappingURL=subjectController.js.map