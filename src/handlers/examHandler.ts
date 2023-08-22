import { examDb, examSubjectDb, questionDb, subjectDb, topicDb } from "../db"
import { IExamSubject, IExamTopic } from "../interfaces/exam";
import { createQuestionData } from "./questionHandler";

export const getRandomQuestionsTopic = async(topic:IExamTopic) => {
  if(topic.numberOfQuestions < 1)
    return [];
  const {questions} = await topicDb.getQuestions(topic.topicId);
  if(questions.length < topic.numberOfQuestions){
    console.log(`insufficient questions in the database. question in data base: ${questions.length}, questionsNeeded: ${topic.numberOfQuestions}`);
    return;
  }

  const questionIds = questions.map(question => question.id);
  const randomQuestionIds = questionIds.sort(() => 0.5 - Math.random()).slice(0, topic.numberOfQuestions);
  // const randomQuestions = await questionDb.getManyQuestions(randomQuestionIds);
  // const examQuestions = randomQuestions.map(randomQuestion => createQuestionData(randomQuestion));
  return randomQuestionIds;
}

export const getRandomQuestionsSubjectId = async({subjectId, numberOfQuestions, excludedTopics}:{subjectId:number, numberOfQuestions:number,excludedTopics:number[]}) => {

  if(numberOfQuestions < 1)
    return [];

  const {topics} = await subjectDb.getTopics(subjectId);
  const filteredTopics = topics.filter(topic => !excludedTopics.includes(topic.id));
  const questionIds = filteredTopics.flatMap(topic => topic.questions.map(question => question.id));

  if(questionIds.length < numberOfQuestions){
    console.log(`insufficient questions in the database. question in data base: ${questionIds.length}, questionsNeeded: ${numberOfQuestions}`);
    return;
  }

  const randomQuestionIds = questionIds.sort(() => 0.5 - Math.random()).slice(0, numberOfQuestions);
  // const randomQuestions = await questionDb.getManyQuestions(randomQuestionIds);
  // const examQuestions = randomQuestions.map(randomQuestion => createQuestionData(randomQuestion));
  return randomQuestionIds;
}

export const getRandomQuestionsSubject = async(subject:IExamSubject) => {
  let totalQuestions = subject.numberOfQuestions;
  subject.questionIds = [];
  await Promise.all(subject.topics.map(async (topic) => {
    const questions = await getRandomQuestionsTopic(topic);
    subject.questionIds = [...subject.questionIds,...questions];
    totalQuestions -= topic.numberOfQuestions;
  }));

  const excludedTopics = subject.topics.map(topic => topic.topicId);
  const remainingQuestions = await getRandomQuestionsSubjectId({subjectId:subject.subjectId,excludedTopics,numberOfQuestions:totalQuestions });
  subject.questionIds = [...subject.questionIds,...remainingQuestions];

  return subject;
}

export const createExamSubjects = async(subjects:IExamSubject[]) => {
  let ids:number[] = [];
  await Promise.all(subjects.map(async (subject) => {
    const data = await examSubjectDb.createExamSubject(subject);
    ids = [...ids,data.id];
  }))
  return ids;
}