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
function makeTopicDb({ makeDb }) {
    function createTopic({ topicData, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const topic = yield db.topic.create({
                data: {
                    name: topicData.name,
                    description: topicData.description,
                    subject: {
                        connect: {
                            id: topicData.subjectId
                        }
                    },
                    createdBy: {
                        connect: {
                            id: userId
                        }
                    }
                }
            }).catch((e) => console.log(e));
            return topic;
        });
    }
    function getTopics({ subjectId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const topics = yield db.topic.findMany({
                where: {
                    subjectId
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    subjectId: true,
                    _count: {
                        select: {
                            questions: {
                                where: {
                                    isActive: true,
                                },
                            },
                        }
                    }
                },
                orderBy: {
                    updatedAt: "desc",
                }
            });
            return topics;
        });
    }
    function getTopic(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const topic = yield db.topic.findUnique({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    subjectId: true,
                    _count: {
                        select: {
                            questions: {
                                where: {
                                    isActive: true,
                                },
                            },
                        }
                    }
                }
            });
            return topic;
        });
    }
    function editTopic({ topicData, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const topic = yield db.topic.update({
                where: {
                    id
                },
                data: {
                    name: topicData.name,
                    description: topicData.description
                }
            }).catch((e) => console.log(e));
            return topic;
        });
    }
    function deleteTopic(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const topic = yield db.topic.delete({
                where: {
                    id
                }
            });
            return topic;
        });
    }
    function getQuestions(topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const questions = yield db.topic.findUnique({
                where: {
                    id: topicId
                },
                select: {
                    questions: {
                        where: {
                            isActive: true,
                        },
                        select: {
                            id: true,
                        },
                        orderBy: {
                            updatedAt: "desc",
                        }
                    },
                },
            });
            return questions;
        });
    }
    return { createTopic, getTopics, deleteTopic, editTopic, getQuestions, getTopic };
}
exports.default = makeTopicDb;
//# sourceMappingURL=topic.js.map