import { IHttpRequest } from "../interfaces/http";
import { ICreateTestData, IQuestionBank } from "../interfaces/exam";

import { examDb, questionDb } from "../db";
import { getQuestionBanksForEdit, getQuestionsFromTopic, getTopicIdAndComplexity } from "../handlers/examHandler";

export const createExam = async (req: IHttpRequest) => {
  const testData:ICreateTestData = req.body.testData;
  const userId: number = req.body.userId;

  let questionIds:number[] = [];
  const topics = testData.testDetails.questionBankTopics;

  await Promise.all(topics.map(async (topic) => {
    const newQuestionIds = await getQuestionsFromTopic(topic);
    questionIds = [...questionIds,...newQuestionIds];
  }))

  const exam = await examDb.createExam({userId,data:testData,questions:questionIds});

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: { exam },
  };
};

export const editExam = async (req: IHttpRequest) => {
  const testData:ICreateTestData = req.body.testData;
  const userId: number = req.body.userId;
  const id:number = req.body.examId;

  let questionIds:number[] = [];
  const topics = testData.testDetails.questionBankTopics;

  await Promise.all(topics.map(async (topic) => {
    const newQuestionIds = await getQuestionsFromTopic(topic);
    questionIds = [...questionIds,...newQuestionIds];
  }))

  const exam = await examDb.editExam({id,userId,data:testData,questions:questionIds});

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: { exam },
  };
};

export const getExamData = async(req:IHttpRequest) => {
  const id:number = parseInt(req.query.id,10);
  const exam = await examDb.getExamForEdit(id);
  const questionIds = exam.questions.map(question => question.id);
  const topicIdAndComplexityArray = await getTopicIdAndComplexity(questionIds);
  const questionBankTopics = await getQuestionBanksForEdit(topicIdAndComplexityArray);

  const data:ICreateTestData = {
    pricing: {
      price: exam.price,
      promoCodes: [],
      testType: exam.price === 0 ? "open" : "private",
    },
    testDetails: {
      questionBankTopics,
      testDescription: exam.description,
      testName: exam.name,
      totalQuestions: exam.totalQuestions,
    },
    testSettings: {
      negativeMarks: exam.negativeMarks,
      passPercentage: exam.passPercentage,
      resultFormat: "",
      testDeclaration: "",
      testStartDate: exam.testStartDate,
      testEndDate: exam.testEndDate,
      testStartTime: exam.testStartTime,
      testEndTime: exam.testEndTime,
      totalMarks: exam.totalMarks,
      totalQuestions: exam.totalQuestions,
      testDuration: exam.testDuration,
      testDateAvailability: exam.testStartDate === "always" ? "always" : "specific",
      testTimeAvailability: exam.testStartTime === "always" ? "always" : "specific",
      testDurationAvailability: exam.testDuration === 0 ? "always" : "specific",

    }
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: { exam:data },
  };

}

export const getAllExams = async (req: IHttpRequest) => {
  const exams = await examDb.getAllExams();
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: { exams },
  };
};

export const deleteAllExams = async (req: IHttpRequest) => {
  await examDb.deleteAll();
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: { msg: "Deleted Successfully" },
  };
};

export const deleteManyExams = async (req: IHttpRequest) => {
  const ids = req.body.ids;
  await examDb.deleteMany(ids);
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: { msg: "Deleted Successfully" },
  };
};

export const getExam = async (req: IHttpRequest) => {
  const id = JSON.parse(req.query.examId);
  const exam = await examDb.getExam(id);
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: { exam },
  };
};

export const getResult = async (req:IHttpRequest) => {
  const data = req.query.data;
  let score = 0;
  const responses = Object.values(data)
  await Promise.all(responses.map(async ({id, response}:{id:string, response:string}) => {
    const answer = await questionDb.getAnswer(parseInt(id,10));
    console.log({answer,response});
    if(answer === response)
      score = score + 1;
  }));

  console.log(score);
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: { score },
  };
}