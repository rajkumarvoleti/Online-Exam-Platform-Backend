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
exports.getQuestionsFromBank = void 0;
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
const getQuestionsFromBank = (bank) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield db_1.subjectDb.getTopics(bank.id);
    const allQuestions = topics.topics.map(topic => topic.questions).flat();
    const easyQuestions = allQuestions.filter(question => question.complexity === "easy").map(question => question.id);
    const mediumQuestions = allQuestions.filter(question => question.complexity === "medium").map(question => question.id);
    const hardQuestions = allQuestions.filter(question => question.complexity === "hard").map(question => question.id);
    const randomEasyQuestions = getRandomSubarray(easyQuestions, bank.selectedEasyQuestionsCount);
    const randomMediumQuestions = getRandomSubarray(mediumQuestions, bank.selectedMediumQuestionsCount);
    const randomHardQuestions = getRandomSubarray(hardQuestions, bank.selectedHardQuestionsCount);
    return [...randomEasyQuestions, ...randomMediumQuestions, ...randomHardQuestions];
});
exports.getQuestionsFromBank = getQuestionsFromBank;
//# sourceMappingURL=examHandler.js.map