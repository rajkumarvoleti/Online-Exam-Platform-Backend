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
function makeExamSubjectDb({ makeDb }) {
    const db = makeDb();
    const createExamSubject = (data) => __awaiter(this, void 0, void 0, function* () {
        const examSubject = yield db.examSubject.create({
            data: {
                numberOfQuestions: data.numberOfQuestions,
                questions: {
                    connect: data.questionIds.map(id => {
                        return { id };
                    })
                },
                subjectId: data.subjectId,
                topics: {
                    createMany: {
                        data: data.topics.map(topic => {
                            return {
                                numberOfQuestions: topic.numberOfQuestions,
                                topicId: topic.topicId,
                            };
                        })
                    }
                },
            },
            select: {
                id: true
            }
        });
        return examSubject;
    });
    return { createExamSubject };
}
exports.default = makeExamSubjectDb;
//# sourceMappingURL=examSubject.js.map