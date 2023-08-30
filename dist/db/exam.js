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
function makeExamDb({ makeDb }) {
    const db = makeDb();
    const createExam = (data) => __awaiter(this, void 0, void 0, function* () {
        const exam = db.exam.create({
            data: {
                description: data.description,
                name: data.name,
                totalMarks: data.totalMarks,
                totalQuestions: data.totalMarks,
                totalTime: data.totalTime,
                testAvailabilityStart: data.testAvailabilityStart,
                testAvailabilityEnd: data.testAvailabilityEnd,
                subjects: {
                    connect: data.subjectIds.map(id => {
                        return { id };
                    }),
                },
                createdBy: {
                    connect: { id: data.userId }
                }
            }
        }).catch((e) => console.log(e));
        return exam;
    });
    const deleteAll = () => __awaiter(this, void 0, void 0, function* () {
        yield db.exam.deleteMany({
            where: {}
        });
    });
    const getExam = (id) => __awaiter(this, void 0, void 0, function* () {
        const exam = yield db.exam.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                description: true,
                testAvailabilityStart: true,
                testAvailabilityEnd: true,
                totalMarks: true,
                totalQuestions: true,
                totalTime: true,
                subjects: {
                    select: {
                        numberOfQuestions: true,
                        questions: {
                            select: {
                                id: true,
                                description: true,
                                type: true,
                                options: {
                                    select: {
                                        description: true
                                    }
                                },
                            }
                        }
                    }
                }
            }
        });
        return exam;
    });
    const getAllExams = () => __awaiter(this, void 0, void 0, function* () {
        const exams = yield db.exam.findMany({
            where: {},
            select: {
                subjects: {
                    include: {
                        questions: {
                            select: { id: true },
                        },
                        topics: true,
                    }
                },
                description: true,
                id: true,
                name: true,
                testAvailabilityStart: true,
                testAvailabilityEnd: true,
                totalMarks: true,
                totalQuestions: true,
                totalTime: true
            }
        });
        return exams;
    });
    return { createExam, getAllExams, deleteAll, getExam };
}
exports.default = makeExamDb;
//# sourceMappingURL=exam.js.map