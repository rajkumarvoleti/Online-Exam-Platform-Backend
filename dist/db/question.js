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
function makeQuestionDb({ makeDb }) {
    function createQuestion({ questionData, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const question = yield db.question.create({
                data: {
                    description: questionData.question,
                    answer: questionData.answer.description,
                    answerExplanation: questionData.answer.explanation,
                    complexity: questionData.complexity,
                    type: questionData.answer.type,
                    topic: {
                        connect: {
                            id: questionData.topicId
                        }
                    },
                    createdBy: {
                        connect: {
                            id: userId
                        }
                    },
                    options: {
                        createMany: {
                            data: questionData.answer.options.map(opt => {
                                return {
                                    description: opt.description,
                                    isAnswer: opt.isCorrect,
                                    createdById: userId
                                };
                            }),
                        }
                    }
                },
                select: {
                    answer: true,
                    answerExplanation: true,
                    complexity: true,
                    description: true,
                    id: true,
                    type: true,
                    topicId: true,
                    options: {
                        select: {
                            description: true,
                            isAnswer: true,
                        }
                    }
                }
            });
            return question;
        });
    }
    function createManyQuestions({ questionsData, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const questions = yield db.question.createMany({
                data: questionsData.map(questionData => {
                    return {
                        description: questionData.question,
                        answer: questionData.answer.description,
                        answerExplanation: questionData.answer.explanation,
                        complexity: questionData.complexity,
                        type: questionData.answer.type,
                        topicId: questionData.topicId,
                        createdById: userId,
                    };
                }),
            }).catch(e => console.log(e));
            return questions;
        });
    }
    function getQuestions(topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const questions = yield db.question.findMany({
                where: {
                    topicId,
                    isActive: true,
                },
                select: {
                    answer: true,
                    answerExplanation: true,
                    complexity: true,
                    description: true,
                    id: true,
                    type: true,
                    topicId: true,
                    isActive: true,
                    options: {
                        select: {
                            description: true,
                            isAnswer: true,
                        }
                    },
                },
                orderBy: {
                    updatedAt: "desc",
                }
            });
            return questions.filter(question => question.isActive);
        });
    }
    function getManyQuestions(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const questions = yield db.question.findMany({
                where: {
                    id: { in: ids },
                    isActive: true,
                },
                select: {
                    answer: true,
                    answerExplanation: true,
                    complexity: true,
                    description: true,
                    id: true,
                    type: true,
                    topicId: true,
                    options: {
                        select: {
                            description: true,
                            isAnswer: true,
                        }
                    },
                },
                orderBy: {
                    updatedAt: "desc",
                }
            });
            return questions;
        });
    }
    function getQuestion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const questions = yield db.question.findUnique({
                where: {
                    id,
                    isActive: true,
                },
                select: {
                    answer: true,
                    answerExplanation: true,
                    complexity: true,
                    description: true,
                    id: true,
                    type: true,
                    topicId: true,
                    options: {
                        select: {
                            description: true,
                            isAnswer: true,
                        }
                    },
                }
            });
            return questions;
        });
    }
    function getAnswer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const question = yield db.question.findUnique({
                where: {
                    id,
                },
                select: {
                    type: true,
                    answer: true,
                    options: {
                        select: {
                            description: true,
                            isAnswer: true,
                        }
                    }
                }
            });
            console.log(question);
            if (question.type === "multipleChoice" || question.type === "trueOrFalse")
                return question.options.find(opt => opt.isAnswer).description;
            return question.answer;
        });
    }
    function getAllQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const questions = yield db.question.findMany({
                where: {
                    isActive: true,
                },
                select: {
                    id: true,
                    description: true,
                    topic: {
                        select: {
                            name: true,
                            description: true,
                            id: true,
                        }
                    }
                },
                orderBy: {
                    updatedAt: "desc",
                }
            });
            return questions;
        });
    }
    function editQuestion({ questionData, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            yield db.option.deleteMany({
                where: {
                    questionId: questionData.questionId,
                },
            });
            const question = yield db.question.update({
                where: {
                    id: questionData.questionId
                },
                data: {
                    description: questionData.question,
                    answer: questionData.answer.description,
                    answerExplanation: questionData.answer.explanation,
                    complexity: questionData.complexity,
                    type: questionData.answer.type,
                    options: {
                        createMany: {
                            data: questionData.answer.options.map(opt => {
                                return {
                                    description: opt.description,
                                    isAnswer: opt.isCorrect,
                                    createdById: userId
                                };
                            }),
                        }
                    }
                },
            });
            return question;
        });
    }
    function isQuestionPresentInAnyExam(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const examCount = yield db.exam.count({
                where: {
                    questions: {
                        some: {
                            id: questionId,
                        },
                    },
                },
            });
            return examCount > 0;
        });
    }
    function deleteQuestion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const isPresent = yield isQuestionPresentInAnyExam(id);
            let question;
            if (isPresent) {
                question = yield db.question.update({
                    where: { id },
                    data: {
                        isActive: false,
                    }
                });
                return question;
            }
            question = yield db.question.delete({
                where: {
                    id
                }
            });
            return question;
        });
    }
    function deleteQuestions(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const data = yield db.question.findUnique({
                where: {
                    id: ids[0],
                },
                select: {
                    topicId: true,
                }
            });
            yield Promise.all(ids.map((id) => __awaiter(this, void 0, void 0, function* () {
                yield deleteQuestion(id);
            })));
            return data.topicId;
        });
    }
    return { createQuestion, getAllQuestions, deleteQuestion, editQuestion, getQuestions, getQuestion, createManyQuestions, getManyQuestions, deleteQuestions, getAnswer };
}
exports.default = makeQuestionDb;
//# sourceMappingURL=question.js.map