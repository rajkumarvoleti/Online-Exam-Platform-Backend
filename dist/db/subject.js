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
function makeSubjectDb({ makeDb }) {
    function createSubject({ subjectData, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const subject = yield db.subject.create({
                data: {
                    name: subjectData.name,
                    description: subjectData.description,
                    createdBy: {
                        connect: {
                            id: userId
                        }
                    }
                }
            }).catch((e) => console.log(e));
            return subject;
        });
    }
    function createSubjectAndTopics({ data, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const subjects = yield db.subject.create({
                data: {
                    name: data.name,
                    description: data.description,
                    createdBy: {
                        connect: { id: userId }
                    },
                    topics: {
                        createMany: {
                            data: data.topics.map(topic => ({
                                createdById: userId,
                                name: topic.name,
                                description: topic.description
                            }))
                        }
                    }
                }
            });
            return subjects;
        });
    }
    function getAllSubjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const subjects = yield db.subject.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    _count: {
                        select: {
                            topics: true,
                        }
                    }
                },
                orderBy: {
                    updatedAt: "desc",
                }
            });
            return subjects;
        });
    }
    function getSubject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const subjects = yield db.subject.findUnique({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    _count: {
                        select: {
                            topics: true
                        }
                    }
                }
            });
            return subjects;
        });
    }
    function editSubject({ subjectData, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const subject = yield db.subject.update({
                where: {
                    id
                },
                data: {
                    name: subjectData.name,
                    description: subjectData.description
                }
            }).catch((e) => console.log(e));
            return subject;
        });
    }
    function deleteSubject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            yield db.subject.delete({
                where: {
                    id
                }
            });
        });
    }
    function getTopics(subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const topics = yield db.subject.findUnique({
                where: { id: subjectId },
                select: {
                    topics: {
                        select: {
                            id: true,
                            questions: {
                                where: {
                                    isActive: true,
                                },
                                select: {
                                    id: true,
                                    complexity: true,
                                },
                            }
                        },
                        orderBy: {
                            updatedAt: "desc",
                        }
                    }
                }
            });
            return topics;
        });
    }
    function getAllQuestionBanks() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const questionBanks = yield db.subject.findMany({
                where: {},
                select: {
                    id: true,
                    name: true,
                    topics: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            });
            return questionBanks;
        });
    }
    return { createSubject, getAllSubjects, deleteSubject, editSubject, getTopics, getSubject, getAllQuestionBanks, createSubjectAndTopics };
}
exports.default = makeSubjectDb;
//# sourceMappingURL=subject.js.map