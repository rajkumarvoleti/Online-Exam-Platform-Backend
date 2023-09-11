import { questionDb, subjectDb, topicDb } from "../db"
import { IQuestionBank, IQuestionLevel, ISelectedQuestionBankTopic } from "../interfaces/exam"

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

interface ITopicAndComplexity {
  topicId: number;
  complexity: IQuestionLevel;
}

export const getTopicIdAndComplexity = async(questionIds:number[]) => {
  const topicIdAndComplexityArray:ITopicAndComplexity[] = await Promise.all(questionIds.map(async (id) => {
    const data = await questionDb.getQuestion(id);
    const topicAndCOmplexity:ITopicAndComplexity = {complexity: data.complexity, topicId: data.topicId};
    return topicAndCOmplexity;
  }))
  return topicIdAndComplexityArray
}

export const getSelectedTopicRecord = (data:ITopicAndComplexity[]) => {
  const result: Record<number, { easyCount: number; mediumCount: number; hardCount: number }> = {};

  for (const item of data) {
    const { topicId, complexity } = item;

    if (!result[topicId]) {
      result[topicId] = { easyCount: 0, mediumCount: 0, hardCount: 0 };
    }

    switch (complexity) {
      case 'easy':
        result[topicId].easyCount++;
        break;
      case 'medium':
        result[topicId].mediumCount++;
        break;
      case 'hard':
        result[topicId].hardCount++;
        break;
      default:
        break;
      }
    }
  return result;
}

export const getQuestionBanksForEdit = async(topicIdAndComplexityArray:ITopicAndComplexity[]) => {
  const selectedTopicRecord = getSelectedTopicRecord(topicIdAndComplexityArray);

  const topicIds = Object.keys(selectedTopicRecord);
  const questionBankTopics:ISelectedQuestionBankTopic[] = await Promise.all(topicIds.map(async(topicId) => {

    const topic = await topicDb.getTopic(parseInt(topicId,10));
    const {easyQuestionsCount, hardQuestionsCount, mediumQuestionsCount} = await getQuestionsCount(topic.id);

    const selectedTopic:ISelectedQuestionBankTopic = {
      easyQuestionsCount,
      hardQuestionsCount,
      mediumQuestionsCount,
      totalQuestions: easyQuestionsCount +
      hardQuestionsCount +
      mediumQuestionsCount,
      id:topic.id,
      name: topic.name,
      selectedEasyQuestionsCount: selectedTopicRecord[topic.id].easyCount,
      selectedMediumQuestionsCount: selectedTopicRecord[topic.id].mediumCount,
      selectedHardQuestionsCount: selectedTopicRecord[topic.id].hardCount,
      selectedTotalQuestions: selectedTopicRecord[topic.id].easyCount +
      selectedTopicRecord[topic.id].mediumCount +
      selectedTopicRecord[topic.id].hardCount,
    }
    return selectedTopic;
  }))
  return questionBankTopics
}