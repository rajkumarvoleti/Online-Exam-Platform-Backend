"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionData = void 0;
const createQuestionData = (questionData) => {
    const question = {
        question: questionData.description,
        questionId: questionData.id,
        answer: {
            description: questionData.answer,
            explanation: questionData.answerExplanation,
            options: questionData.options.map((opt) => { return { description: opt.description, isCorrect: opt.isAnswer }; }),
            type: questionData.type,
        },
        complexity: questionData.complexity,
        topicId: questionData.topicId,
    };
    return question;
};
exports.createQuestionData = createQuestionData;
//# sourceMappingURL=questionHandler.js.map