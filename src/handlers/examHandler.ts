import { questionDb, subjectDb, topicDb } from "../db"
import { IQuestionBank, ISelectedQuestionBank } from "../interfaces/exam"

function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getRandomSubarray<T>(array: T[], size: number): T[] {
  shuffleArray(array);
  return array.slice(0, size);
}

export const getQuestionsFromBank = async (bank:ISelectedQuestionBank) => {
  const topics = await subjectDb.getTopics(bank.id);
  const allQuestions = topics.topics.map(topic => topic.questions).flat();
  const easyQuestions = allQuestions.filter(question => question.complexity === "easy").map(question => question.id);
  const mediumQuestions = allQuestions.filter(question => question.complexity === "medium").map(question => question.id);
  const hardQuestions = allQuestions.filter(question => question.complexity === "hard").map(question => question.id);
  const randomEasyQuestions = getRandomSubarray(easyQuestions,bank.selectedEasyQuestionsCount);
  const randomMediumQuestions = getRandomSubarray(mediumQuestions,bank.selectedMediumQuestionsCount);
  const randomHardQuestions = getRandomSubarray(hardQuestions,bank.selectedHardQuestionsCount);
  return [...randomEasyQuestions,...randomMediumQuestions,...randomHardQuestions];
}