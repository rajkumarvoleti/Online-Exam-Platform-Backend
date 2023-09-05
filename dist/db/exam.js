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
    const createExam = ({ userId, data, questions }) => __awaiter(this, void 0, void 0, function* () {
        const { testDetails, testSettings, pricing } = data;
        const testPrice = pricing.testType === "open" ? 0 : pricing.price;
        const testDuration = testSettings.testDurationAvailability === "always" ? 0 : testSettings.testDuration;
        const testStartDate = testSettings.testDateAvailability === "always" ? "always" : testSettings.testStartDate;
        const testEndDate = testSettings.testDateAvailability === "always" ? "always" : testSettings.testEndDate;
        const testStartTime = testSettings.testTimeAvailability === "always" ? "always" : testSettings.testStartTime;
        const testEndTime = testSettings.testTimeAvailability === "always" ? "always" : testSettings.testEndTime;
        const exam = db.exam.create({
            data: {
                description: testDetails.testDescription,
                name: testDetails.testName,
                negativeMarks: testSettings.negativeMarks,
                passPercentage: testSettings.passPercentage,
                price: testPrice,
                testDuration,
                totalMarks: data.testSettings.totalMarks,
                totalQuestions: data.testDetails.totalQuestions,
                testStartDate,
                testEndDate,
                testStartTime,
                testEndTime,
                questions: {
                    connect: questions.map(question => {
                        return { id: question };
                    }),
                },
                createdBy: {
                    connect: { id: userId }
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
            where: { id },
            select: {
                id: true,
                questions: {
                    select: {
                        complexity: true,
                        id: true,
                        options: true,
                        description: true,
                        type: true,
                    }
                },
                testDuration: true,
            }
        });
        return exam;
    });
    const getAllExams = () => __awaiter(this, void 0, void 0, function* () {
        const exams = db.exam.findMany();
        return exams;
    });
    return { createExam, getAllExams, deleteAll, getExam };
}
exports.default = makeExamDb;
//# sourceMappingURL=exam.js.map