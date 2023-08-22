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
exports.createExamSubjects = exports.getRandomQuestionsSubject = exports.getRandomQuestionsSubjectId = exports.getRandomQuestionsTopic = void 0;
const db_1 = require("../db");
const getRandomQuestionsTopic = (topic) => __awaiter(void 0, void 0, void 0, function* () {
    if (topic.numberOfQuestions < 1)
        return [];
    const { questions } = yield db_1.topicDb.getQuestions(topic.topicId);
    if (questions.length < topic.numberOfQuestions) {
        console.log(`insufficient questions in the database. question in data base: ${questions.length}, questionsNeeded: ${topic.numberOfQuestions}`);
        return;
    }
    const questionIds = questions.map(question => question.id);
    const randomQuestionIds = questionIds.sort(() => 0.5 - Math.random()).slice(0, topic.numberOfQuestions);
    // const randomQuestions = await questionDb.getManyQuestions(randomQuestionIds);
    // const examQuestions = randomQuestions.map(randomQuestion => createQuestionData(randomQuestion));
    return randomQuestionIds;
});
exports.getRandomQuestionsTopic = getRandomQuestionsTopic;
const getRandomQuestionsSubjectId = ({ subjectId, numberOfQuestions, excludedTopics }) => __awaiter(void 0, void 0, void 0, function* () {
    if (numberOfQuestions < 1)
        return [];
    const { topics } = yield db_1.subjectDb.getTopics(subjectId);
    const filteredTopics = topics.filter(topic => !excludedTopics.includes(topic.id));
    const questionIds = filteredTopics.flatMap(topic => topic.questions.map(question => question.id));
    if (questionIds.length < numberOfQuestions) {
        console.log(`insufficient questions in the database. question in data base: ${questionIds.length}, questionsNeeded: ${numberOfQuestions}`);
        return;
    }
    const randomQuestionIds = questionIds.sort(() => 0.5 - Math.random()).slice(0, numberOfQuestions);
    // const randomQuestions = await questionDb.getManyQuestions(randomQuestionIds);
    // const examQuestions = randomQuestions.map(randomQuestion => createQuestionData(randomQuestion));
    return randomQuestionIds;
});
exports.getRandomQuestionsSubjectId = getRandomQuestionsSubjectId;
const getRandomQuestionsSubject = (subject) => __awaiter(void 0, void 0, void 0, function* () {
    let totalQuestions = subject.numberOfQuestions;
    subject.questionIds = [];
    yield Promise.all(subject.topics.map((topic) => __awaiter(void 0, void 0, void 0, function* () {
        const questions = yield (0, exports.getRandomQuestionsTopic)(topic);
        subject.questionIds = [...subject.questionIds, ...questions];
        totalQuestions -= topic.numberOfQuestions;
    })));
    const excludedTopics = subject.topics.map(topic => topic.topicId);
    const remainingQuestions = yield (0, exports.getRandomQuestionsSubjectId)({ subjectId: subject.subjectId, excludedTopics, numberOfQuestions: totalQuestions });
    subject.questionIds = [...subject.questionIds, ...remainingQuestions];
    return subject;
});
exports.getRandomQuestionsSubject = getRandomQuestionsSubject;
const createExamSubjects = (subjects) => __awaiter(void 0, void 0, void 0, function* () {
    let ids = [];
    yield Promise.all(subjects.map((subject) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield db_1.examSubjectDb.createExamSubject(subject);
        ids = [...ids, data.id];
    })));
    return ids;
});
exports.createExamSubjects = createExamSubjects;
//# sourceMappingURL=examHandler.js.map