import { questionDb, subjectDb, topicDb } from "../db"
import { IQuestionBank, ISelectedQuestionBankTopic } from "../interfaces/exam"

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

export const getQuestionsFromTopic = async (topic:ISelectedQuestionBankTopic) => {
  const questions = await questionDb.getQuestionsWithComplexity(topic.id);
  const easyQuestions = questions.filter(question => question.complexity === "easy").map(question => question.id);
  const mediumQuestions = questions.filter(question => question.complexity === "medium").map(question => question.id);
  const hardQuestions = questions.filter(question => question.complexity === "hard").map(question => question.id);
  const randomEasyQuestions = getRandomSubarray(easyQuestions,topic.selectedEasyQuestionsCount);
  const randomMediumQuestions = getRandomSubarray(mediumQuestions,topic.selectedMediumQuestionsCount);
  const randomHardQuestions = getRandomSubarray(hardQuestions,topic.selectedHardQuestionsCount);
  return [...randomEasyQuestions,...randomMediumQuestions,...randomHardQuestions];
}

export const getQuestionsCount = async (topicId:number) => {
  const questions = await questionDb.getQuestionsWithComplexity(topicId);
  const easyQuestionsCount:number = questions.filter(question => question.complexity === "easy").length;
  const mediumQuestionsCount:number = questions.filter(question => question.complexity === "medium").length;
  const hardQuestionsCount:number = questions.filter(question => question.complexity === "hard").length;
  return {easyQuestionsCount, mediumQuestionsCount, hardQuestionsCount};
}

export const getTopic = async ({id, name}:{id: number, name: string}) => {
  const {easyQuestionsCount, hardQuestionsCount, mediumQuestionsCount} = await getQuestionsCount(id);
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
  }
}