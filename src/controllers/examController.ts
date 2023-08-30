import { IHttpRequest } from "../interfaces/http";
import { IExam, IExamSubject } from "../interfaces/exam";
import {
  createExamSubjects,
  getRandomQuestionsSubject,
} from "../handlers/examHandler";
import { examDb, questionDb } from "../db";

export const createExam = async (req: IHttpRequest) => {
  const { testData } = req.body;
  console.log(testData);

  let examSubjects: IExamSubject[] = [];
  await Promise.all(
    testData.subjects.map(async (subject: IExamSubject, i: number) => {
      const updatedSubject = await getRandomQuestionsSubject(subject);
      examSubjects = [...examSubjects, updatedSubject];
    })
  );

  console.log("hello");

  const examSubjectIds = await createExamSubjects(examSubjects);

  const examDetails: IExam = {
    description: testData.description,
    name: testData.name,
    subjectIds: examSubjectIds,
    testAvailabilityStart: new Date(),
    testAvailabilityEnd: new Date(),
    totalMarks: testData.totalMarks,
    totalQuestions: testData.totalQuestions,
    totalTime: testData.totalTime,
    userId: testData.userId,
  };

  const exam = await examDb.createExam(examDetails);

  return {
    statusCode: 201,
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

  await Promise.all(data.map(async ({id, response}:{id:string, response:string}) => {
    const answer = await questionDb.getAnswer(parseInt(id,10));
    console.log({answer, response});
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