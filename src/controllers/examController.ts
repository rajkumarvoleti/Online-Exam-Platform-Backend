import { IHttpRequest } from "../interfaces/http";
import { ICreateTestData } from "../interfaces/exam";

import { examDb, questionDb } from "../db";
import { getQuestionsFromBank } from "../handlers/examHandler";

export const createExam = async (req: IHttpRequest) => {
  const testData:ICreateTestData = req.body.testData;
  const userId: number = req.body.userId;

  let questionIds:number[] = [];
  await Promise.all(testData.testDetails.questionBanks.map(async (bank) => {
    const newQuestionIds = await getQuestionsFromBank(bank);
    questionIds = [...questionIds,...newQuestionIds];
  }));

  const exam = await examDb.createExam({userId,data:testData,questions:questionIds});

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: { exam },
  };
};

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
  console.log(responses);
  await Promise.all(responses.map(async ({id, response}:{id:string, response:string}) => {
    const answer = await questionDb.getAnswer(parseInt(id,10));
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