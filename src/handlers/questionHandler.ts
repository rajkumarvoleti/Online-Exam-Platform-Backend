import { IQuestionAndAnswer } from "../interfaces/exam"

export const createQuestionData = (questionData:any) => {
  const question:IQuestionAndAnswer = {
    question: questionData.description,
    questionId: questionData.id,
    answer: {
      description: questionData.answer,
      explanation: questionData.answerExplanation,
      options: questionData.options.map((opt:any) => {return {description: opt.description,isCorrect:opt.isAnswer}}),
      type: questionData.type,
    },
    complexity:questionData.complexity,
    topicId:questionData.topicId,
  }
  return question;
}