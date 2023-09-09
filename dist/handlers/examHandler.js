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
exports.getTopic = exports.getQuestionsCount = exports.getQuestionsFromTopic = void 0;
const db_1 = require("../db");
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function getRandomSubarray(array, size) {
    shuffleArray(array);
    return array.slice(0, size);
}
const getQuestionsFromTopic = (topic) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield db_1.questionDb.getQuestionsWithComplexity(topic.id);
    const easyQuestions = questions.filter(question => question.complexity === "easy").map(question => question.id);
    const mediumQuestions = questions.filter(question => question.complexity === "medium").map(question => question.id);
    const hardQuestions = questions.filter(question => question.complexity === "hard").map(question => question.id);
    const randomEasyQuestions = getRandomSubarray(easyQuestions, topic.selectedEasyQuestionsCount);
    const randomMediumQuestions = getRandomSubarray(mediumQuestions, topic.selectedMediumQuestionsCount);
    const randomHardQuestions = getRandomSubarray(hardQuestions, topic.selectedHardQuestionsCount);
    return [...randomEasyQuestions, ...randomMediumQuestions, ...randomHardQuestions];
});
exports.getQuestionsFromTopic = getQuestionsFromTopic;
const getQuestionsCount = (topicId) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield db_1.questionDb.getQuestionsWithComplexity(topicId);
    const easyQuestionsCount = questions.filter(question => question.complexity === "easy").length;
    const mediumQuestionsCount = questions.filter(question => question.complexity === "medium").length;
    const hardQuestionsCount = questions.filter(question => question.complexity === "hard").length;
    return { easyQuestionsCount, mediumQuestionsCount, hardQuestionsCount };
});
exports.getQuestionsCount = getQuestionsCount;
const getTopic = ({ id, name }) => __awaiter(void 0, void 0, void 0, function* () {
    const { easyQuestionsCount, hardQuestionsCount, mediumQuestionsCount } = yield (0, exports.getQuestionsCount)(id);
    return {
        easyQuestionsCount,
        hardQuestionsCount,
        mediumQuestionsCount,
        id,
        name,
        selectedEasyQuestionsCount: 0,
        selectedHardQuestionsCount: 0,
        selectedMediumQuestionsCount: 0,
        selectedTotalQuestions: 0,
        totalQuestions: easyQuestionsCount + mediumQuestionsCount + hardQuestionsCount
    };
});
exports.getTopic = getTopic;
//# sourceMappingURL=examHandler.js.map